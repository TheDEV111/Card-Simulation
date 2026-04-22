import { useState, useCallback, useRef } from "react";

export function useAsync(asyncFn, deps = []) {
  const [state, setState] = useState({ data: null, error: null, loading: false });
  const mountedRef = useRef(true);

  const execute = useCallback(async (...args) => {
    setState({ data: null, error: null, loading: true });
    try {
      const data = await asyncFn(...args);
      if (mountedRef.current) setState({ data, error: null, loading: false });
      return data;
    } catch (error) {
      if (mountedRef.current) setState({ data: null, error, loading: false });
      throw error;
    }
  }, deps);

  return { ...state, execute };
}
