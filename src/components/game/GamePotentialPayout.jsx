import { WIN_MULTIPLIER } from "../../utils/constants";
import STXAmount from "../ui/STXAmount";
import { expectedValue } from "../../utils/probability";

export default function GamePotentialPayout({ stake, className = "" }) {
  if (!stake) return null;
  const maxWin = stake * WIN_MULTIPLIER;
  const ev     = expectedValue(stake);

  return (
    <div className={`rounded-xl bg-white/3 border border-white/6 px-4 py-3 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <p className="text-xs text-white/30 mb-1">Max win</p>
          <p className="text-base font-bold text-win" style={{ fontFamily: "Cinzel, serif" }}>
            +<STXAmount ustx={maxWin} />
          </p>
        </div>
        <div className="w-px h-8 bg-white/8" />
        <div className="text-center">
          <p className="text-xs text-white/30 mb-1">Stake</p>
          <p className="text-base font-bold text-white/70" style={{ fontFamily: "Cinzel, serif" }}>
            <STXAmount ustx={stake} />
          </p>
        </div>
        <div className="w-px h-8 bg-white/8" />
        <div className="text-center">
          <p className="text-xs text-white/30 mb-1">Exp. value</p>
          <p className={`text-base font-bold tabular-nums ${ev >= 0 ? "text-win" : "text-loss"}`} style={{ fontFamily: "Cinzel, serif" }}>
            {ev >= 0 ? "+" : "−"}<STXAmount ustx={Math.abs(ev)} />
          </p>
        </div>
      </div>
    </div>
  );
}
