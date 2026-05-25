import { usePageLifecycle } from "../../hooks/usePageLifecycle.js";

export function PageLifecycleBanner() {
  const { isFrozen } = usePageLifecycle();

  if (!isFrozen) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0,
      insetInline: 0,
      zIndex: 250,
      padding: "10px 16px",
      background: "#1e1e2a",
      border: "none",
      borderBottom: "1px solid rgba(212,168,75,0.15)",
      fontFamily: "Barlow, sans-serif",
      fontSize: 12,
      color: "#d4a84b",
      textAlign: "center",
    }}>
      Page was suspended — resuming…
    </div>
  );
}
