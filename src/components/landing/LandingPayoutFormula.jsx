import { WIN_MULTIPLIER } from "../../utils/constants";

export default function LandingPayoutFormula() {
  return (
    <div className="rounded-xl bg-surface-raised border border-white/8 px-6 py-5">
      <p className="text-[10px] text-white/30 uppercase tracking-widest mb-3">Payout formula</p>
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-white/60 text-sm">stake</span>
        <span className="text-white/30">×</span>
        <span className="text-gold font-bold text-xl" style={{ fontFamily: "Cinzel, serif" }}>
          {WIN_MULTIPLIER}
        </span>
        <span className="text-white/30">=</span>
        <span className="text-win font-semibold text-sm">payout</span>
      </div>
      <p className="text-xs text-white/30 mt-3 leading-relaxed">
        Executed atomically within the same contract call. No delay, no escrow.
      </p>
    </div>
  );
}
