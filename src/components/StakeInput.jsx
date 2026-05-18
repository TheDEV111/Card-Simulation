const MIN_STAKE = 1000;
const MAX_STAKE = 1_000_000;

function toSTX(micro) {
  return (micro / 1_000_000).toFixed(6).replace(/\.?0+$/, "");
}

const QUICK_PICKS = [
  { label: "0.01",  micro: 10_000 },
  { label: "0.1",   micro: 100_000 },
  { label: "0.5",   micro: 500_000 },
  { label: "Max",   micro: MAX_STAKE },
];

export default function StakeInput({ value, onChange, disabled }) {
  function handleChange(e) {
    const micro = Math.round(parseFloat(e.target.value || 0) * 1_000_000);
    if (!isNaN(micro)) onChange(Math.min(Math.max(micro, 0), MAX_STAKE));
  }

  const stxValue = value ? (value / 1_000_000).toString() : "";
  const pct = value > MIN_STAKE
    ? Math.min(((value - MIN_STAKE) / (MAX_STAKE - MIN_STAKE)) * 100, 100)
    : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="label-caps">Stake</p>
        <span className="text-2xs text-white/25">
          {toSTX(MIN_STAKE)} – {toSTX(MAX_STAKE)} STX
        </span>
      </div>

      <div className="relative">
        <input
          type="number"
          min={MIN_STAKE / 1_000_000}
          max={MAX_STAKE / 1_000_000}
          step="0.000001"
          value={stxValue}
          onChange={handleChange}
          disabled={disabled}
          placeholder="0.001"
          className="input-field pr-14"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gold pointer-events-none tracking-widest">
          STX
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gold rounded-full transition-all duration-300 ease-expo-out"
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Quick picks */}
      <div className="grid grid-cols-4 gap-1.5">
        {QUICK_PICKS.map(({ label, micro }) => (
          <button
            key={label}
            disabled={disabled}
            onClick={() => onChange(micro)}
            className={[
              "py-1.5 rounded-lg text-2xs font-semibold transition-all duration-150",
              value === micro
                ? "bg-gold/15 text-gold"
                : "bg-surface-overlay text-white/35 hover:text-white/60 hover:bg-surface-high",
            ].join(" ")}
          >
            {label}
          </button>
        ))}
      </div>

      {value > 0 && value < MIN_STAKE && (
        <p className="text-2xs text-loss">
          Minimum stake is {toSTX(MIN_STAKE)} STX
        </p>
      )}
    </div>
  );
}
