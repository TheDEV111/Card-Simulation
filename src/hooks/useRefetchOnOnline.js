import { useEffect } from "react";

export function useRefetchOnOnline(refetch) {
  useEffect(() => {
    const handler = () => refetch?.();
    window.addEventListener("online", handler);
    return () => window.removeEventListener("online", handler);
  }, [refetch]);
}
