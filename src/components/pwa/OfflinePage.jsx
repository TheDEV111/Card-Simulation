export function OfflinePage({ onRetry }) {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0f0f14" }}
    >
      <div className="mb-8 relative">
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
          style={{ background: "#16161e", border: "1px solid rgba(212,168,75,0.15)" }}
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
            style={{ color: "rgba(212,168,75,0.6)" }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M3 3l18 18M8.111 8.111A5.5 5.5 0 0015.89 15.89M3.458 7.5A8 8 0 0021 12a8.075 8.075 0 01-.458 2.723" />
          </svg>
        </div>
      </div>

      <h1
        className="text-2xl font-bold mb-3 tracking-wide"
        style={{ fontFamily: "Cinzel, serif", color: "#d4a84b", letterSpacing: "0.05em" }}
      >
        No Connection
      </h1>

      <p className="text-sm mb-8 max-w-xs leading-relaxed" style={{ color: "rgba(226,226,232,0.5)", fontFamily: "Barlow, sans-serif" }}>
        The table is temporarily unreachable. Check your connection and try again — your balance is safe.
      </p>

      <button
        onClick={onRetry}
        className="px-6 py-3 rounded-lg text-sm font-semibold tracking-wider uppercase transition-all duration-150 active:scale-95"
        style={{
          background: "#d4a84b",
          color: "#0f0f14",
          fontFamily: "Barlow, sans-serif",
          letterSpacing: "0.08em",
        }}
      >
        Try Again
      </button>

      <p className="mt-8 text-xs" style={{ color: "rgba(226,226,232,0.25)", fontFamily: "Barlow, sans-serif" }}>
        Previously visited pages may still be available offline
      </p>
    </div>
  );
}
