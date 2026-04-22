import { WIN_ODDS } from "../../utils/constants";

const pct = Math.round(WIN_ODDS * 100);

export default function LandingWinRateCallout() {
  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-surface-raised border border-white/8">
      <div className="text-center">
        <p className="text-2xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          {pct}%
        </p>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Win odds</p>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <p className="text-2xl font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>
          3×
        </p>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Payout</p>
      </div>
      <div className="w-px h-8 bg-white/10" />
      <div className="text-center">
        <p className="text-2xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          3
        </p>
        <p className="text-[10px] text-white/40 uppercase tracking-widest">Suits</p>
      </div>
    </div>
  );
}
