/**
 * Tiny durable key store shared by the API handlers (rate limits, idempotency).
 *
 * Backed by a real Redis when REDIS_URL is set (Redis Cloud, Upstash, or any
 * standard redis:// instance — via ioredis). One client per warm serverless
 * instance, lazy-connected on first use.
 *
 * ponytail: falls back to a process-local Map when REDIS_URL is missing. That
 * fallback resets on every cold start and is not shared between instances —
 * good enough for local dev, NOT a real abuse control in production.
 */
import Redis from 'ioredis';

const REDIS_URL = process.env.REDIS_URL;
const memory = new Map(); // key → { value, expiresAt }

let client = null;
function getClient() {
  if (!client) {
    client = new Redis(REDIS_URL, {
      lazyConnect: true,
      maxRetriesPerRequest: 1,
      connectTimeout: 3000,
      commandTimeout: 3000,
    });
    client.on('error', (err) => console.error('[store] redis error', err?.message));
  }
  return client;
}

function memGet(key) {
  const e = memory.get(key);
  if (!e) return null;
  if (Date.now() > e.expiresAt) {
    memory.delete(key);
    return null;
  }
  return e.value;
}

export const isDurable = Boolean(REDIS_URL);

/** SET key value NX EX ttl → true when the key was newly set (first claim wins). */
export async function claim(key, ttlSec, value = '1') {
  if (isDurable) return (await getClient().set(key, value, 'EX', ttlSec, 'NX')) === 'OK';
  if (memGet(key) !== null) return false;
  memory.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
  return true;
}

export async function get(key) {
  if (isDurable) return getClient().get(key);
  return memGet(key);
}

export async function set(key, value, ttlSec) {
  if (isDurable) return getClient().set(key, value, 'EX', ttlSec);
  memory.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
}

export async function del(key) {
  if (isDurable) return getClient().del(key);
  memory.delete(key);
}

/** INCR with TTL on first hit. Returns the new count. */
export async function incr(key, ttlSec) {
  if (isDurable) {
    const redis = getClient();
    const n = await redis.incr(key);
    if (n === 1) await redis.expire(key, ttlSec);
    return n;
  }
  const n = (memGet(key) || 0) + 1;
  const e = memory.get(key);
  memory.set(key, { value: n, expiresAt: e ? e.expiresAt : Date.now() + ttlSec * 1000 });
  return n;
}

/**
 * Rate limit by IP. Returns true when the request is allowed.
 * Fails OPEN when the store is unreachable so a Redis outage never blocks real leads.
 */
export async function rateLimit(scope, ip, max, windowSec) {
  try {
    return (await incr(`rl:${scope}:${ip}`, windowSec)) <= max;
  } catch (err) {
    console.error('[store] rateLimit unavailable, allowing', err?.message);
    return true;
  }
}

export function clientIp(req) {
  return (
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown'
  );
}

/** Test hook: wipe the in-memory fallback. */
export function _resetMemory() {
  memory.clear();
}
