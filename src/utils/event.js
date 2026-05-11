export function createEventBus() {
  const listeners = new Map();

  function on(event, handler) {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event).add(handler);
    return () => off(event, handler);
  }

  function off(event, handler) {
    listeners.get(event)?.delete(handler);
  }

  function emit(event, ...args) {
    listeners.get(event)?.forEach((h) => h(...args));
  }

  function once(event, handler) {
    const wrapped = (...args) => {
      handler(...args);
      off(event, wrapped);
    };
    return on(event, wrapped);
  }

  function clear(event) {
    if (event) listeners.delete(event);
    else listeners.clear();
  }

  return { on, off, emit, once, clear };
}

export const globalBus = createEventBus();
