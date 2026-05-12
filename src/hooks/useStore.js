import { useState, useEffect, useCallback } from "react";
import { createStore } from "../services/store";

const stores = new Map();

export function useStore(key, initial) {
  if (!stores.has(key)) stores.set(key, createStore(initial));
  const store = stores.get(key);

  const [state, setState] = useState(() => store.getState());

  useEffect(() => store.subscribe(setState), [store]);

  const set = useCallback((updater) => store.setState(updater), [store]);

  return [state, set];
}
