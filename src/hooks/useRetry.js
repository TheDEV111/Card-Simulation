import { useState, useCallback } from "react";
import { retry } from "../utils/promise";

export function useRetry(asyncFn, { attempts = 3, backoff = 300 } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: false, attempt: 0 });

  const execute = useCallback(
    async (...args) => {
      setState({ data: null, error: null, loading: true, attempt: 0 });
      let attempt = 0;
      try {
        const data = await retry(
          async () => {
            attempt++;
            setState((s) => ({ ...s, attempt }));
            return asyncFn(...args);
          },
          { attempts, backoff }
        );
        setState({ data, error: null, loading: false, attempt });
        return data;
      } catch (error) {
        setState({ data: null, error, loading: false, attempt });
        throw error;
      }
    },
    [asyncFn, attempts, backoff]
  );

  return { ...state, execute };
}
