import { usePWACapabilities } from "../../hooks/usePWACapabilities.js";

const FEATURES = [
  { key: "serviceWorker",   label: "Service Worker" },
  { key: "push",            label: "Push Notifications" },
  { key: "backgroundSync",  label: "Background Sync" },
  { key: "periodicSync",    label: "Periodic Sync" },
  { key: "wakeLock",        label: "Wake Lock" },
  { key: "share",           label: "Web Share" },
  { key: "battery",         label: "Battery Status" },
  { key: "notifications",   label: "Notifications" },
  { key: "storageEstimate", label: "Storage Estimate" },
  { key: "persistStorage",  label: "Persistent Storage" },
  { key: "networkInfo",     label: "Network Info" },
  { key: "indexedDB",       label: "IndexedDB" },
];

export function PWACapabilitiesPanel() {
  const caps = usePWACapabilities();
  const supported = FEATURES.filter((f) => caps[f.key]);
  const unsupported = FEATURES.filter((f) => !caps[f.key]);

  return (
    <div>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: 11,
        color: "#d4a84b",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "0 0 12px",
      }}>
        Browser Capabilities
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
        {FEATURES.map(({ key, label }) => {
          const ok = caps[key];
          return (
            <div key={key} style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "Barlow, sans-serif",
              fontSize: 11,
              color: ok ? "rgba(226,226,232,0.7)" : "rgba(226,226,232,0.25)",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%", flexShrink: 0,
                background: ok ? "#22c55e" : "rgba(226,226,232,0.15)",
                boxShadow: ok ? "0 0 4px #22c55e" : "none",
              }} />
              {label}
            </div>
          );
        })}
      </div>
      <p style={{
        fontFamily: "Barlow, sans-serif",
        fontSize: 11,
        color: "rgba(226,226,232,0.25)",
        marginTop: 10,
      }}>
        {supported.length}/{FEATURES.length} features supported
      </p>
    </div>
  );
}
