import { useState, useCallback } from "react";

export function useFieldArray(initial = []) {
  const [fields, setFields] = useState(initial);

  const append = useCallback((item) => setFields((f) => [...f, item]), []);
  const prepend = useCallback((item) => setFields((f) => [item, ...f]), []);
  const remove = useCallback((index) => setFields((f) => f.filter((_, i) => i !== index)), []);
  const update = useCallback((index, item) =>
    setFields((f) => f.map((v, i) => (i === index ? (typeof item === "function" ? item(v) : item) : v))), []);
  const move = useCallback((from, to) =>
    setFields((f) => {
      const next = [...f];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    }), []);
  const reset = useCallback(() => setFields(initial), [initial]);
  const swap = useCallback((a, b) =>
    setFields((f) => {
      const next = [...f];
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    }), []);

  return { fields, append, prepend, remove, update, move, swap, reset };
}
