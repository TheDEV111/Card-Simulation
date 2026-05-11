export function createSignal(initialValue) {
  let value = initialValue;
  const subscribers = new Set();

  function get() {
    return value;
  }

  function set(next) {
    const resolved = typeof next === "function" ? next(value) : next;
    if (Object.is(resolved, value)) return;
    value = resolved;
    subscribers.forEach((fn) => fn(value));
  }

  function subscribe(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
  }

  function peek() {
    return value;
  }

  return { get, set, subscribe, peek };
}

export function derived(signals, compute) {
  const signal = createSignal(compute(...signals.map((s) => s.get())));
  const update = () => signal.set(compute(...signals.map((s) => s.get())));
  signals.forEach((s) => s.subscribe(update));
  return { get: signal.get, subscribe: signal.subscribe, peek: signal.peek };
}
