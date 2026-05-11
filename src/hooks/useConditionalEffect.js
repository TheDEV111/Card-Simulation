import { useEffect } from "react";

export function useConditionalEffect(condition, effect, deps = []) {
  useEffect(() => {
    if (condition) return effect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [condition, ...deps]);
}
