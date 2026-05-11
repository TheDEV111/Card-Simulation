import { useState, useCallback } from "react";

export function useSet(initial = []) {
  const [set, setSet] = useState(() => new Set(initial));

  const add    = useCallback((item) => setSet((s) => new Set([...s, item])), []);
  const remove = useCallback((item) => setSet((s) => { const n = new Set(s); n.delete(item); return n; }), []);
  const toggle = useCallback((item) => setSet((s) => { const n = new Set(s); n.has(item) ? n.delete(item) : n.add(item); return n; }), []);
  const clear  = useCallback(() => setSet(new Set()), []);
  const has    = (item) => set.has(item);

  return { set, add, remove, toggle, clear, has, size: set.size };
}
