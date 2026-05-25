import { useOnlineStatus } from "../../hooks/useOnlineStatus.js";

export function OfflineIndicator({ position = "bottom-right", className = "" }) {
  const { isOffline } = useOnlineStatus();

  if (!isOffline) return null;

  const positions = {
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
    "top-right": "fixed top-4 right-4",
    "inline": "inline-flex",
  };

  return (
    <div
      className={`${positions[position] ?? positions["bottom-right"]} z-50 flex items-center gap-2 px-3 py-2 rounded-full text-xs font-medium ${className}`}
      style={{
        background: "#1e1e2a",
        border: "1px solid rgba(239,68,68,0.3)",
        color: "#ef4444",
        fontFamily: "Barlow, sans-serif",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-500" style={{ boxShadow: "0 0 4px #ef4444" }} />
      Offline
    </div>
  );
}
