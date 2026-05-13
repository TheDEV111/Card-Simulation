import { useEffect, useState } from "react";

export function SplashScreen({ minDuration = 1200, onDone }) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        onDone?.();
      }, 400);
    }, minDuration);
    return () => clearTimeout(t);
  }, [minDuration, onDone]);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center"
      style={{
        background: "#0f0f14",
        opacity: fading ? 0 : 1,
        transition: "opacity 400ms ease-out",
        pointerEvents: fading ? "none" : "auto",
      }}
    >
      <div className="flex flex-col items-center gap-6">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center"
          style={{
            background: "rgba(212,168,75,0.08)",
            border: "1px solid rgba(212,168,75,0.25)",
            boxShadow: "0 0 40px rgba(212,168,75,0.08)",
          }}
        >
          <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth={1.5} style={{ color: "#d4a84b" }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </div>

        <div className="text-center">
          <h1
            className="text-2xl font-bold tracking-widest uppercase"
            style={{ fontFamily: "Cinzel, serif", color: "#d4a84b", letterSpacing: "0.15em" }}
          >
            Stacks
          </h1>
          <p className="text-xs mt-1 tracking-[0.3em] uppercase"
            style={{ color: "rgba(212,168,75,0.45)", fontFamily: "Barlow, sans-serif" }}>
            Card Game
          </p>
        </div>

        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-1 h-1 rounded-full"
              style={{
                background: "#d4a84b",
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
