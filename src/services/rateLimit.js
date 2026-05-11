export function createRateLimiter({ requests = 10, window = 1000 } = {}) {
  const timestamps = [];

  function isAllowed() {
    const now = Date.now();
    while (timestamps.length && timestamps[0] <= now - window) {
      timestamps.shift();
    }
    if (timestamps.length < requests) {
      timestamps.push(now);
      return true;
    }
    return false;
  }

  function waitTime() {
    if (timestamps.length < requests) return 0;
    return window - (Date.now() - timestamps[0]);
  }

  async function throttle(fn) {
    const wait = waitTime();
    if (wait > 0) await new Promise((r) => setTimeout(r, wait));
    timestamps.push(Date.now());
    return fn();
  }

  function reset() {
    timestamps.length = 0;
  }

  return { isAllowed, waitTime, throttle, reset };
}

export function createTokenBucket({ capacity = 10, refillRate = 1, refillInterval = 1000 } = {}) {
  let tokens = capacity;
  let lastRefill = Date.now();

  function refill() {
    const now = Date.now();
    const elapsed = (now - lastRefill) / refillInterval;
    tokens = Math.min(capacity, tokens + elapsed * refillRate);
    lastRefill = now;
  }

  function consume(count = 1) {
    refill();
    if (tokens >= count) { tokens -= count; return true; }
    return false;
  }

  return { consume, tokens: () => { refill(); return tokens; } };
}
