// Lightweight fixed-window limiter kept in module scope.
//
// Scope note: this lives in the process's memory, so it protects a single
// server instance. On a multi-instance/serverless deployment each instance
// keeps its own counter — move to Redis/Upstash if you need a global limit.
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

const hits = new Map();

function sweep(now) {
  for (const [key, entry] of hits) {
    if (now > entry.resetAt) hits.delete(key);
  }
}

export function rateLimit(key, { windowMs = WINDOW_MS, max = MAX_REQUESTS } = {}) {
  const now = Date.now();

  // Cheap opportunistic cleanup so the map cannot grow without bound.
  if (hits.size > 500) sweep(now);

  const entry = hits.get(key);

  if (!entry || now > entry.resetAt) {
    hits.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: max - 1, retryAfter: 0 };
  }

  entry.count += 1;

  if (entry.count > max) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((entry.resetAt - now) / 1000),
    };
  }

  return { allowed: true, remaining: max - entry.count, retryAfter: 0 };
}
