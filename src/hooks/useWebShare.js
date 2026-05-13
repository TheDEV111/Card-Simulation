import { useState, useCallback } from "react";
import { isWebShareSupported, shareContent } from "../pwa/share.js";

export function useWebShare() {
  const [sharing, setSharing] = useState(false);
  const [error, setError] = useState(null);
  const [shared, setShared] = useState(false);
  const supported = isWebShareSupported();

  const share = useCallback(async (data) => {
    if (!supported) return false;
    setSharing(true);
    setError(null);
    try {
      await shareContent(data);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
      return true;
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
      return false;
    } finally {
      setSharing(false);
    }
  }, [supported]);

  return { supported, sharing, shared, error, share };
}
