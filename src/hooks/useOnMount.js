import { useEffect } from "react";

export function useOnMount(fn) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(fn, []);
}
