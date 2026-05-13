import { useState, useEffect } from "react";

const DISPLAY_MODES = ["standalone", "minimal-ui", "fullscreen", "browser"];

export function usePWADisplay() {
  const [displayMode, setDisplayMode] = useState("browser");
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const check = () => {
      for (const mode of DISPLAY_MODES) {
        if (window.matchMedia(`(display-mode: ${mode})`).matches) {
          setDisplayMode(mode);
          setIsStandalone(mode !== "browser");
          return;
        }
      }
      if (window.navigator.standalone === true) {
        setDisplayMode("standalone");
        setIsStandalone(true);
      }
    };

    check();
    const mql = window.matchMedia("(display-mode: standalone)");
    mql.addEventListener("change", check);
    return () => mql.removeEventListener("change", check);
  }, []);

  return {
    displayMode,
    isStandalone,
    isBrowser: displayMode === "browser",
    isFullscreen: displayMode === "fullscreen",
    isMinimalUI: displayMode === "minimal-ui",
  };
}
