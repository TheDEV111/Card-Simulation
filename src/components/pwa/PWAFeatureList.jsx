const FEATURES = [
  { icon: "🔌", title: "Works Offline", desc: "Play without an internet connection" },
  { icon: "⚡", title: "Instant Load", desc: "Cached assets load in milliseconds" },
  { icon: "🔔", title: "Win Alerts", desc: "Get notified of results and challenges" },
  { icon: "🔄", title: "Auto Updates", desc: "Always on the latest version" },
  { icon: "🔒", title: "Secure", desc: "HTTPS-only with data persistence" },
  { icon: "📱", title: "Native Feel", desc: "Fullscreen, no browser chrome" },
];

export function PWAFeatureList() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {FEATURES.map(({ icon, title, desc }) => (
        <div key={title} style={{
          padding: "12px 14px",
          borderRadius: 10,
          background: "rgba(226,226,232,0.02)",
          border: "1px solid rgba(226,226,232,0.05)",
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: 16, lineHeight: 1, flexShrink: 0 }}>{icon}</span>
          <div>
            <p style={{
              fontFamily: "Cinzel, serif",
              fontSize: 11,
              fontWeight: 700,
              color: "#d4a84b",
              margin: 0,
            }}>{title}</p>
            <p style={{
              fontFamily: "Barlow, sans-serif",
              fontSize: 11,
              color: "rgba(226,226,232,0.35)",
              margin: "2px 0 0",
              lineHeight: 1.35,
            }}>{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
