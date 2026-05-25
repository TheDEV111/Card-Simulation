import { useInstallationState } from "../../hooks/useInstallationState.js";

export function InstallSuccessBanner() {
  const { justInstalled } = useInstallationState();

  if (!justInstalled) return null;

  return (
    <div style={{
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 300,
      padding: "12px 24px",
      borderRadius: 12,
      background: "#16161e",
      border: "1px solid rgba(34,197,94,0.3)",
      boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 20px rgba(34,197,94,0.1)",
      fontFamily: "Barlow, sans-serif",
      fontSize: 13,
      color: "#22c55e",
      display: "flex",
      alignItems: "center",
      gap: 8,
      whiteSpace: "nowrap",
    }}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      App installed successfully
    </div>
  );
}
