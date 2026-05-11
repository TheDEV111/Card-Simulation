import { useEffect, useRef } from "react";

export function useOnUnmount(fn) {
  const saved = useRef(fn);
  useEffect(() => { saved.current = fn; }, [fn]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => saved.current(), []);
}
