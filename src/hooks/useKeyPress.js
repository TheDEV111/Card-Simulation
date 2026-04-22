import { useEffect } from "react";

export function useKeyPress(key, callback, deps = []) {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) callback(e);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, ...deps]);
}
