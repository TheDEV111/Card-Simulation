import { useState } from "react";
import { PWADashboard } from "./PWADashboard.jsx";

export function PWADrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="PWA Status"
        style={{
          position: "fixed",
          bottom: 24,
          left: 16,
          zIndex: 100,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "#16161e",
          border: "1px solid rgba(212,168,75,0.2)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d4a84b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3m-3 3h3m-6 3h.008v.008H6V15zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
      </button>

      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 400,
              background: "rgba(15,15,20,0.6)", backdropFilter: "blur(4px)",
            }}
          />
          <div style={{
            position: "fixed",
            inset: "0 0 0 auto",
            zIndex: 401,
            width: "min(480px, 100vw)",
            background: "#0f0f14",
            borderLeft: "1px solid rgba(212,168,75,0.12)",
            overflowY: "auto",
            boxShadow: "-16px 0 48px rgba(0,0,0,0.6)",
          }}>
            <div style={{
              position: "sticky",
              top: 0,
              background: "#0f0f14",
              borderBottom: "1px solid rgba(226,226,232,0.05)",
              padding: "16px 16px 12px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              zIndex: 1,
            }}>
              <span style={{ fontFamily: "Cinzel, serif", fontSize: 14, color: "#d4a84b", fontWeight: 700 }}>
                PWA Status
              </span>
              <button onClick={() => setOpen(false)} style={{
                background: "none", border: "none", cursor: "pointer",
                color: "rgba(226,226,232,0.4)", fontSize: 22, lineHeight: 1, padding: 0,
              }}>×</button>
            </div>
            <PWADashboard />
          </div>
        </>
      )}
    </>
  );
}
