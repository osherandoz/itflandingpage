/**
 * Tiny durable key store shared by the API handlers (rate limits, idempotency).
 *
 * Backed by an Upstash-compatible Redis REST endpoint when
 * KV_REST_API_URL + KV_REST_API_TOKEN are set (Vercel Marketplace "Upstash for Redis"
 * injects exactly these names). Plain fetch, no SDK.
 *
 * ponytail: falls back to a process-local Map when the env vars are missing. That
 * fallback resets on every cold start and is not shared between instances — good
 * enough for local dev, NOT a real abuse control. Provision the KV store for prod.
 */

const URL = process.env.KV_REST_API_URL;
const TOKEN = process.env.KV_REST_API_TOKEN;
const memory = new Map(); // key → { value, expiresAt }

function memGet(key) {
  const e = memory.get(key);
  if (!e) return null;
  if (Date.now() > e.expiresAt) {
    memory.delete(key);
    return null;
  }
  return e.value;
}

async function redis(cmd) {
  const r = await fetch(URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd),
    signal: AbortSignal.timeout(3000),
  });
  if (!r.ok) throw new Error(`kv ${r.status}`);
  const data = await r.json();
  if (data.error) throw new Error(`kv ${data.error}`);
  return data.result;
}

export const isDurable = Boolean(URL && TOKEN);

/** SET key value NX EX ttl → true when the key was newly set (first claim wins). */
export async function claim(key, ttlSec, value = '1') {
  if (isDurable) return (await redis(['SET', key, value, 'NX', 'EX', String(ttlSec)])) === 'OK';
  if (memGet(key) !== null) return false;
  memory.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
  return true;
}

export async function get(key) {
  if (isDurable) return redis(['GET', key]);
  return memGet(key);
}

export async function set(key, value, ttlSec) {
  if (isDurable) return redis(['SET', key, value, 'EX', String(ttlSec)]);
  memory.set(key, { value, expiresAt: Date.now() + ttlSec * 1000 });
}

export async function del(key) {
  if (isDurable) return redis(['DEL', key]);
  memory.delete(key);
}

/** INCR with TTL on first hit. Returns the new count. */
export async function incr(key, ttlSec) {
  if (isDurable) {
    const n = await redis(['INCR', key]);
    if (n === 1) await redis(['EXPIRE', key, String(ttlSec)]);
    return n;
  }
  const n = (memGet(key) || 0) + 1;
  const e = memory.get(key);
  memory.set(key, { value: n, expiresAt: e ? e.expiresAt : Date.now() + ttlSec * 1000 });
  return n;
}

/**
 * Rate limit by IP. Returns true when the request is allowed.
 * Fails OPEN when the store is unreachable so a KV outage never blocks real leads.
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
