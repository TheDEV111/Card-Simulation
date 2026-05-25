import { useState, useEffect } from "react";

export function usePageLifecycle() {
  const [state, setState] = useState("active");
  const [frozen, setFrozen] = useState(false);

  useEffect(() => {
    const onFreeze = () => { setState("frozen"); setFrozen(true); };
    const onResume = () => { setState("active"); setFrozen(false); };
    const onHide = () => setState("hidden");
    const onVisible = () => setState(document.visibilityState === "visible" ? "active" : "hidden");
    const onPageHide = (e) => setState(e.persisted ? "frozen" : "terminated");

    document.addEventListener("freeze", onFreeze);
    document.addEventListener("resume", onResume);
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("blur", onHide);

    return () => {
      document.removeEventListener("freeze", onFreeze);
      document.removeEventListener("resume", onResume);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("blur", onHide);
    };
  }, []);

  return {
    state,
    frozen,
    isActive: state === "active",
    isHidden: state === "hidden",
    isFrozen: state === "frozen",
    isTerminated: state === "terminated",
  };
}
