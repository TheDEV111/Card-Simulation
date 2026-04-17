const MIN_STAKE = 1000; // microSTX
const MAX_STAKE = 1_000_000; // microSTX

function toSTX(micro) {
  return (micro / 1_000_000).toFixed(6).replace(/\.?0+$/, "");
}

export default function StakeInput({ value, onChange, disabled }) {
  function handleChange(e) {
    const micro = Math.round(parseFloat(e.target.value || 0) * 1_000_000);
    if (!isNaN(micro)) onChange(Math.min(Math.max(micro, 0), MAX_STAKE));
  }

  const stxValue = value ? (value / 1_000_000).toString() : "";

  const pct = Math.min(((value - MIN_STAKE) / (MAX_STAKE - MIN_STAKE)) * 100, 100);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-white/40 uppercase tracking-widest">
          Stake amount
        </p>
        <span className="text-xs text-white/30">
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
          className="input-field pr-16"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gold pointer-events-none">
          STX
        </span>
      </div>

      {value > 0 && (
        <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
          <div
            className="h-full bg-gold rounded-full transition-all duration-300"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      {value > 0 && value < MIN_STAKE && (
        <p className="mt-1.5 text-xs text-rose-400">
          Minimum stake is {toSTX(MIN_STAKE)} STX
        </p>
      )}
    </div>
  );
}
