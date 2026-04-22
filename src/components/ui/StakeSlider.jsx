import { MIN_STAKE_USTX, MAX_STAKE_USTX } from "../../utils/constants";
import { formatSTX } from "../../utils/format";

const PRESETS = [1_000, 10_000, 100_000, 500_000, 1_000_000];

export default function StakeSlider({ value, onChange, disabled }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="label-caps">Stake</span>
        <span className="text-sm font-semibold text-gold">{formatSTX(value)}</span>
      </div>
      <input
        type="range"
        min={MIN_STAKE_USTX}
        max={MAX_STAKE_USTX}
        step={1000}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        className="w-full accent-gold cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
      />
      <div className="flex gap-1.5 flex-wrap">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            disabled={disabled}
            className={`text-2xs px-2 py-1 rounded-md border transition-all duration-150 ${
              value === p
                ? "bg-gold/15 border-gold/40 text-gold"
                : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {formatSTX(p)}
          </button>
        ))}
      </div>
    </div>
  );
}
