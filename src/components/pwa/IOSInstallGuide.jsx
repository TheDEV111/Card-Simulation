import { useState } from "react";

const STEPS = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    ),
    text: 'Tap the Share icon at the bottom of Safari',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
      </svg>
    ),
    text: 'Scroll down and tap "Add to Home Screen"',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    ),
    text: 'Tap Add — the game will appear on your home screen',
  },
];

export function IOSInstallGuide({ onDismiss }) {
  const [step, setStep] = useState(0);

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-50 rounded-t-3xl p-6"
      style={{
        background: "#1e1e2a",
        border: "1px solid rgba(212,168,75,0.2)",
        borderBottom: "none",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.7)",
      }}
    >
      <div className="w-10 h-1 rounded-full mx-auto mb-6" style={{ background: "rgba(226,226,232,0.15)" }} />
      <h2 className="text-base font-bold text-center mb-6"
        style={{ fontFamily: "Cinzel, serif", color: "#d4a84b", letterSpacing: "0.04em" }}>
        Add to Home Screen
      </h2>

      <ol className="space-y-4 mb-6">
        {STEPS.map(({ icon, text }, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                background: i === step ? "rgba(212,168,75,0.15)" : "rgba(226,226,232,0.04)",
                color: i <= step ? "#d4a84b" : "rgba(226,226,232,0.3)",
                border: `1px solid ${i === step ? "rgba(212,168,75,0.3)" : "rgba(226,226,232,0.08)"}`,
                transition: "all 0.2s",
              }}
            >
              {icon}
            </span>
            <p className="text-sm pt-1.5" style={{
              color: i <= step ? "#e2e2e8" : "rgba(226,226,232,0.4)",
              fontFamily: "Barlow, sans-serif",
              transition: "color 0.2s",
            }}>
              {text}
            </p>
          </li>
        ))}
      </ol>

      <div className="flex gap-3">
        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={onDismiss}
            className="flex-1 py-3 rounded-xl text-sm font-semibold"
            style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
          >
            Got it
          </button>
        )}
        <button
          onClick={onDismiss}
          className="px-4 py-3 rounded-xl text-sm"
          style={{ background: "rgba(226,226,232,0.06)", color: "rgba(226,226,232,0.5)" }}
        >
          Skip
        </button>
      </div>
    </div>
  );
}
