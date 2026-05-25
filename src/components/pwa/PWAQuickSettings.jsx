import { WakeLockToggle } from "./WakeLockToggle.jsx";
import { NotificationSettings } from "./NotificationSettings.jsx";

export function PWAQuickSettings({ onClose }) {
  return (
    <div style={{
      position: "fixed",
      bottom: 80,
      right: 16,
      zIndex: 200,
      width: 280,
      background: "#16161e",
      border: "1px solid rgba(212,168,75,0.15)",
      borderRadius: 16,
      boxShadow: "0 16px 48px rgba(0,0,0,0.6)",
      overflow: "hidden",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "14px 16px 10px",
        borderBottom: "1px solid rgba(226,226,232,0.06)",
      }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 13, color: "#d4a84b", margin: 0, fontWeight: 700 }}>
          Quick Settings
        </p>
        {onClose && (
          <button onClick={onClose} style={{
            background: "none", border: "none", cursor: "pointer",
            color: "rgba(226,226,232,0.3)", padding: 0, fontSize: 18, lineHeight: 1,
          }}>×</button>
        )}
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.55)" }}>
            Screen Wake Lock
          </span>
          <WakeLockToggle />
        </div>
        <div style={{ borderTop: "1px solid rgba(226,226,232,0.05)", paddingTop: 12 }}>
          <NotificationSettings />
        </div>
      </div>
    </div>
  );
}
