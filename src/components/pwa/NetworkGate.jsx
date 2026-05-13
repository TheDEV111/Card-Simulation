import { useOnlineStatus } from "../../hooks/useOnlineStatus.js";
import { OfflinePage } from "./OfflinePage.jsx";

export function NetworkGate({ children, fallback }) {
  const { isOffline, ping } = useOnlineStatus();

  if (isOffline) {
    return fallback ? fallback({ retry: ping }) : <OfflinePage onRetry={ping} />;
  }

  return children;
}

export function NetworkRequired({ children, inline = false }) {
  const { isOffline } = useOnlineStatus();

  if (!isOffline) return children;

  if (inline) {
    return (
      <div
        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
        style={{ background: "#16161e", color: "rgba(226,226,232,0.5)", border: "1px solid rgba(212,168,75,0.1)" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
        <span style={{ fontFamily: "Barlow, sans-serif" }}>Requires internet connection</span>
      </div>
    );
  }

  return null;
}
