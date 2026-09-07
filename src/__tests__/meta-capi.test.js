import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { sendMetaPurchase } from '../../api/_lib/metaCapi.js';

describe('sendMetaPurchase()', () => {
  let fetchMock;
  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ events_received: 1 }) });
    vi.stubGlobal('fetch', fetchMock);
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    delete process.env.META_CAPI_ACCESS_TOKEN;
    delete process.env.META_PIXEL_ID;
  });

  it('skips silently when no access token is configured', async () => {
    delete process.env.META_CAPI_ACCESS_TOKEN;
    const res = await sendMetaPurchase({ eventId: 'tx-1', amount: 197, currency: 'ILS', email: 'a@b.com', phone: '0501234567' });
    expect(res.skipped).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends a hashed, stable-event-id Purchase event when configured', async () => {
    process.env.META_CAPI_ACCESS_TOKEN = 'test-token';
    await sendMetaPurchase({ eventId: 'tx-1', amount: 197, currency: 'ILS', email: 'A@B.com', phone: '0501234567' });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, opts] = fetchMock.mock.calls[0];
    expect(url).toMatch(/graph\.facebook\.com/);
    expect(url).toContain('access_token=test-token');
    const body = JSON.parse(opts.body);
    const event = body.data[0];
    expect(event.event_name).toBe('Purchase');
    expect(event.event_id).toBe('tx-1');
    expect(event.custom_data).toEqual({ value: 197, currency: 'ILS', content_name: 'BMS Course' });
    // never the raw email/phone
    expect(JSON.stringify(event.user_data)).not.toMatch(/A@B\.com|0501234567/);
    expect(event.user_data.em[0]).toHaveLength(64); // sha256 hex
    expect(event.user_data.ph[0]).toHaveLength(64);
  });

  it('is idempotent per transaction id (same input -> same event_id, same hash)', async () => {
    process.env.META_CAPI_ACCESS_TOKEN = 'test-token';
    await sendMetaPurchase({ eventId: 'tx-2', amount: 197, currency: 'ILS', email: 'a@b.com', phone: '0501234567' });
    await sendMetaPurchase({ eventId: 'tx-2', amount: 197, currency: 'ILS', email: 'a@b.com', phone: '0501234567' });
    const [[, opts1], [, opts2]] = fetchMock.mock.calls;
    expect(JSON.parse(opts1.body).data[0].event_id).toBe(JSON.parse(opts2.body).data[0].event_id);
    expect(JSON.parse(opts1.body).data[0].user_data).toEqual(JSON.parse(opts2.body).data[0].user_data);
  });

  it('normalizes an Israeli 05X phone to 972-prefixed digits before hashing', async () => {
    process.env.META_CAPI_ACCESS_TOKEN = 'test-token';
    const crypto = await import('crypto');
    const expected = crypto.createHash('sha256').update('972501234567').digest('hex');
    await sendMetaPurchase({ eventId: 'tx-3', amount: 197, currency: 'ILS', email: '', phone: '0501234567' });
    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.data[0].user_data.ph[0]).toBe(expected);
  });

  it('never throws when Meta rejects the event', async () => {
    process.env.META_CAPI_ACCESS_TOKEN = 'test-token';
    fetchMock.mockResolvedValueOnce({ ok: false, status: 400, json: async () => ({ error: 'bad' }) });
    const res = await sendMetaPurchase({ eventId: 'tx-4', amount: 197, currency: 'ILS', email: 'a@b.com', phone: '' });
    expect(res.ok).toBe(false);
  });

  it('never throws on a network failure', async () => {
    process.env.META_CAPI_ACCESS_TOKEN = 'test-token';
    fetchMock.mockRejectedValueOnce(new Error('network down'));
    const res = await sendMetaPurchase({ eventId: 'tx-5', amount: 197, currency: 'ILS', email: 'a@b.com', phone: '' });
    expect(res.ok).toBe(false);
  });
});
