export function createPubSub() {
  const channels = new Map();
  const history = new Map();

  function publish(channel, message) {
    if (!history.has(channel)) history.set(channel, []);
    history.get(channel).push({ message, at: Date.now() });
    channels.get(channel)?.forEach((fn) => fn(message));
  }

  function subscribe(channel, fn, { replay = 0 } = {}) {
    if (!channels.has(channel)) channels.set(channel, new Set());
    channels.get(channel).add(fn);
    if (replay > 0) {
      const past = history.get(channel) ?? [];
      past.slice(-replay).forEach(({ message }) => fn(message));
    }
    return () => channels.get(channel)?.delete(fn);
  }

  function unsubscribeAll(channel) {
    channels.delete(channel);
  }

  function getHistory(channel, limit) {
    const h = history.get(channel) ?? [];
    return limit ? h.slice(-limit) : [...h];
  }

  function clear(channel) {
    if (channel) {
      channels.delete(channel);
      history.delete(channel);
    } else {
      channels.clear();
      history.clear();
    }
  }

  return { publish, subscribe, unsubscribeAll, getHistory, clear };
}

export const globalPubSub = createPubSub();
