import { useConnectionType } from "../../hooks/useConnectionType.js";

export function SlowNetworkWarning({ className = "" }) {
  const { effectiveType, saveData } = useConnectionType();
  const isSlow = effectiveType === "slow-2g" || effectiveType === "2g";

  if (!isSlow && !saveData) return null;

  return (
    <div
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs ${className}`}
      style={{
        background: "rgba(249,115,22,0.08)",
        border: "1px solid rgba(249,115,22,0.2)",
        color: "#f97316",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
      {saveData ? "Data Saver mode — reduced quality" : `Slow connection (${effectiveType}) — some features may be limited`}
    </div>
  );
}
