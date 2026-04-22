import { formatSTX } from "../../utils/format";
import { MIN_STAKE_USTX, MAX_STAKE_USTX } from "../../utils/constants";

const PRESETS = [
  MIN_STAKE_USTX,
  10_000,
  50_000,
  100_000,
  500_000,
  MAX_STAKE_USTX,
].filter((v, i, arr) => arr.indexOf(v) === i);

export default function GameStakePresets({ value, onChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {PRESETS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            value === p
              ? "bg-gold text-surface"
              : "bg-surface-overlay border border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80"
          }`}
        >
          {formatSTX(p)}
        </button>
      ))}
    </div>
  );
}
