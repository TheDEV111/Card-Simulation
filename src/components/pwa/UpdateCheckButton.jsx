import { useState } from "react";
import { checkForUpdate } from "../../pwa/sw-register.js";

export function UpdateCheckButton() {
  const [checking, setChecking] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleCheck = async () => {
    setChecking(true);
    try {
      await checkForUpdate();
    } catch {}
    setChecking(false);
    setChecked(true);
    setTimeout(() => setChecked(false), 3000);
  };

  return (
    <button
      onClick={handleCheck}
      disabled={checking}
      style={{
        background: "rgba(212,168,75,0.08)",
        border: "1px solid rgba(212,168,75,0.2)",
        color: checked ? "#22c55e" : "#d4a84b",
        fontFamily: "Barlow, sans-serif",
        fontSize: 12,
        fontWeight: 600,
        borderRadius: 8,
        padding: "7px 14px",
        cursor: checking ? "wait" : "pointer",
        transition: "all 0.2s",
        opacity: checking ? 0.6 : 1,
      }}
    >
      {checking ? "Checking…" : checked ? "Up to date ✓" : "Check for Updates"}
    </button>
  );
}
