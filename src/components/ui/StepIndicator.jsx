export default function StepIndicator({ steps, current, className = "" }) {
  return (
    <div className={`flex items-center gap-0 ${className}`}>
      {steps.map((step, i) => (
        <div key={i} className="flex items-center">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < current
                ? "bg-win text-surface"
                : i === current
                ? "bg-gold text-surface"
                : "bg-surface-overlay border border-white/10 text-white/30"
            }`}
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {i < current ? "✓" : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={`w-8 h-px ${i < current ? "bg-win/40" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}
