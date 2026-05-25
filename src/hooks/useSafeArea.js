import { useState, useEffect } from "react";

export function useSafeArea() {
  const [insets, setInsets] = useState({ top: 0, right: 0, bottom: 0, left: 0 });

  useEffect(() => {
    const update = () => {
      const style = getComputedStyle(document.documentElement);
      setInsets({
        top: parseInt(style.getPropertyValue("--sat") || style.getPropertyValue("env(safe-area-inset-top)") || "0"),
        right: parseInt(style.getPropertyValue("--sar") || "0"),
        bottom: parseInt(style.getPropertyValue("--sab") || style.getPropertyValue("env(safe-area-inset-bottom)") || "0"),
        left: parseInt(style.getPropertyValue("--sal") || "0"),
      });
    };

    const style = document.documentElement.style;
    style.setProperty("--sat", "env(safe-area-inset-top)");
    style.setProperty("--sar", "env(safe-area-inset-right)");
    style.setProperty("--sab", "env(safe-area-inset-bottom)");
    style.setProperty("--sal", "env(safe-area-inset-left)");

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return insets;
}
