import { useState, useEffect } from "react";

export function useLocalValue(external) {
  const [local, setLocal] = useState(external);
  useEffect(() => setLocal(external), [external]);
  return [local, setLocal];
}
