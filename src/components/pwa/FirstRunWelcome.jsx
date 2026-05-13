import { useFirstRun } from "../../hooks/useFirstRun.js";
import { useState } from "react";

export function FirstRunWelcome({ onDismiss }) {
  const { firstRun } = useFirstRun();
  const [dismissed, setDismissed] = useState(false);

  if (!firstRun || dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <div style={{
      position: "fixed",
      inset: 0,
      zIndex: 500,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(15,15,20,0.85)",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{
        width: "min(340px, 90vw)",
        background: "#16161e",
        border: "1px solid rgba(212,168,75,0.2)",
        borderRadius: 20,
        padding: "32px 28px 24px",
        textAlign: "center",
        boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
      }}>
        <div style={{
          width: 60, height: 60, borderRadius: 16, margin: "0 auto 20px",
          background: "rgba(212,168,75,0.08)", border: "1px solid rgba(212,168,75,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d4a84b" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
          </svg>
        </div>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 18, fontWeight: 700, color: "#d4a84b", margin: "0 0 8px" }}>
          Welcome
        </p>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 13, color: "rgba(226,226,232,0.55)", margin: "0 0 24px", lineHeight: 1.6 }}>
          Your card simulation app is ready. Play, track your balance, and challenge the odds.
        </p>
        <button
          onClick={handleDismiss}
          style={{
            width: "100%",
            background: "#d4a84b",
            color: "#0f0f14",
            fontFamily: "Cinzel, serif",
            fontSize: 13,
            fontWeight: 700,
            border: "none",
            borderRadius: 10,
            padding: "12px 0",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          Start Playing
        </button>
      </div>
    </div>
  );
}
