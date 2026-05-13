import { useEffect, useRef } from "react";

export function useBeforeUnload(shouldWarn, message = "You have unsaved changes. Leave anyway?") {
  const shouldWarnRef = useRef(shouldWarn);
  shouldWarnRef.current = shouldWarn;

  useEffect(() => {
    const handler = (e) => {
      if (!shouldWarnRef.current) return;
      e.preventDefault();
      e.returnValue = message;
      return message;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [message]);
}
