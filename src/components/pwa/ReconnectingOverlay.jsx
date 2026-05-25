import { useEffect, useState } from "react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus.js";

export function ReconnectingOverlay() {
  const { isOffline, isOnline } = useOnlineStatus();
  const [show, setShow] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    if (isOffline) {
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }
    if (isOnline && show) {
      setReconnected(true);
      const t = setTimeout(() => { setShow(false); setReconnected(false); }, 2000);
      return () => clearTimeout(t);
    }
  }, [isOffline, isOnline, show]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl"
      style={{
        background: "#1e1e2a",
        border: `1px solid ${reconnected ? "rgba(34,197,94,0.3)" : "rgba(212,168,75,0.2)"}`,
        transition: "border-color 0.3s",
      }}
    >
      {reconnected ? (
        <>
          <span className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm" style={{ color: "#22c55e", fontFamily: "Barlow, sans-serif" }}>Back online</span>
        </>
      ) : (
        <>
          <div className="w-4 h-4 border-2 rounded-full animate-spin"
            style={{ borderColor: "rgba(212,168,75,0.2)", borderTopColor: "#d4a84b" }} />
          <span className="text-sm" style={{ color: "rgba(226,226,232,0.7)", fontFamily: "Barlow, sans-serif" }}>
            Reconnecting…
          </span>
        </>
      )}
    </div>
  );
}
