import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function UpdateOverlay({ show }) {
  const { apply, updating } = useSWUpdate();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(15,15,20,0.95)", backdropFilter: "blur(12px)" }}>
      <div className="text-center px-8 max-w-sm">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-2 animate-spin"
            style={{ borderColor: "rgba(212,168,75,0.2)", borderTopColor: "#d4a84b" }} />
          <div className="absolute inset-2 rounded-full flex items-center justify-center"
            style={{ background: "rgba(212,168,75,0.08)" }}>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              style={{ color: "#d4a84b" }}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        </div>
        <h2 className="text-lg font-bold mb-2"
          style={{ fontFamily: "Cinzel, serif", color: "#d4a84b", letterSpacing: "0.05em" }}>
          Updating…
        </h2>
        <p className="text-sm" style={{ color: "rgba(226,226,232,0.4)", fontFamily: "Barlow, sans-serif" }}>
          Loading the latest version of the game
        </p>
      </div>
    </div>
  );
}
