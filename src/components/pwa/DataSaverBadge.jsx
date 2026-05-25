import { useConnectionType } from "../../hooks/useConnectionType.js";

export function DataSaverBadge({ className = "" }) {
  const { saveData } = useConnectionType();

  if (!saveData) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        background: "rgba(99,102,241,0.1)",
        color: "#818cf8",
        border: "1px solid rgba(99,102,241,0.2)",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
      Data Saver
    </span>
  );
}
