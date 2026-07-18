/**
 * rate-limit.ts
 * -----------------------------------------------------------------------
 * Minimal in-memory rate limiter keyed by IP. Good enough to stop casual
 * spam/bot abuse of the contact form on a single serverless instance.
 *
 * NOTE: Vercel serverless functions are stateless between cold starts and
 * can run as multiple concurrent instances, so this is a best-effort
 * limiter, not a hard guarantee. For stricter protection at scale, swap
 * this for Vercel's Edge Config / Upstash Redis-based rate limiting.
 * -----------------------------------------------------------------------
 */

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 3;

const hits = new Map<string, number[]>();

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    hits.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  hits.set(key, timestamps);
  return false;
}
