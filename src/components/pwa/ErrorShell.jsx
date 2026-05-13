export function ErrorShell({ error, onRetry }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0f0f14" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          style={{ color: "#ef4444" }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2"
        style={{ fontFamily: "Cinzel, serif", color: "#e2e2e8", letterSpacing: "0.05em" }}>
        Something went wrong
      </h2>
      {error && (
        <p className="text-xs mb-4 font-mono px-4 py-2 rounded-lg max-w-xs break-all"
          style={{ color: "#ef4444", background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.1)" }}>
          {error.message ?? String(error)}
        </p>
      )}
      {onRetry && (
        <button onClick={onRetry}
          className="mt-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
          style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}>
          Try Again
        </button>
      )}
    </div>
  );
}
