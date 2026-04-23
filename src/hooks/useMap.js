import { useState, useCallback } from "react";

export function useMap(initial = []) {
  const [map, setMap] = useState(() => new Map(initial));

  const set    = useCallback((key, value) => setMap((m) => new Map([...m, [key, value]])), []);
  const remove = useCallback((key) => setMap((m) => { const n = new Map(m); n.delete(key); return n; }), []);
  const clear  = useCallback(() => setMap(new Map()), []);
  const has    = (key) => map.has(key);
  const get    = (key) => map.get(key);

  return { map, set, remove, clear, has, get, size: map.size };
}
