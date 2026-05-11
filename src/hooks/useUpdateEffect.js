import { useEffect } from "react";
import { useIsFirstRender } from "./useIsFirstRender";

export function useUpdateEffect(effect, deps) {
  const isFirst = useIsFirstRender();
  useEffect(() => {
    if (!isFirst) return effect();
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
}
