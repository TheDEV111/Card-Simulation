import { useState, useCallback, useRef, useEffect } from "react";

export function useSafeState(initial) {
  const mounted = useRef(false);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; }; }, []);
  const [state, setState] = useState(initial);
  const safeSetState = useCallback((v) => { if (mounted.current) setState(v); }, []);
  return [state, safeSetState];
}
