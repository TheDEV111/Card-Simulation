export default function Stepper({ steps = [], current = 0, className = "" }) {
  return (
    <ol className={`flex items-center gap-0 ${className}`}>
      {steps.map((step, i) => {
        const done   = i < current;
        const active = i === current;

        return (
          <li key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  done   ? "bg-win text-black" :
                  active ? "bg-gold text-black" :
                           "bg-white/10 text-white/30"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span className={`text-[9px] whitespace-nowrap ${active ? "text-white/70" : "text-white/25"}`}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-px mx-2 mb-4 ${i < current ? "bg-win/40" : "bg-white/10"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
