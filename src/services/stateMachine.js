export function createStateMachine(config) {
  const { initial, states } = config;
  let current = initial;
  const listeners = new Set();

  function notify(prev, next, event) {
    listeners.forEach((fn) => fn({ state: next, prev, event }));
  }

  function send(event) {
    const def = states[current];
    if (!def) return;
    const transitions = def.on ?? {};
    const target = transitions[event];
    if (!target) return;

    const prev = current;
    states[current]?.exit?.();
    current = target;
    states[current]?.entry?.();
    notify(prev, current, event);
  }

  function matches(state) {
    return current === state;
  }

  function getState() {
    return current;
  }

  function subscribe(fn) {
    listeners.add(fn);
    return () => listeners.delete(fn);
  }

  return { send, matches, getState, subscribe };
}
