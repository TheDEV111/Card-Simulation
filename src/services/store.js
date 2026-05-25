import { createSignal } from "../utils/signal";

export function createStore(initial) {
  const signal = createSignal(initial);
  const history = [initial];

  function getState() {
    return signal.get();
  }

  function setState(updater) {
    const next = typeof updater === "function" ? updater(signal.get()) : updater;
    if (Object.is(next, signal.get())) return;
    history.push(next);
    signal.set(next);
  }

  function subscribe(fn) {
    return signal.subscribe(fn);
  }

  function reset() {
    setState(initial);
  }

  function getHistory() {
    return [...history];
  }

  return { getState, setState, subscribe, reset, getHistory };
}
