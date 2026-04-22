import { WIN_ODDS, WIN_MULTIPLIER } from "../../utils/constants";

export default function GameOddsWidget() {
  return (
    <div className="flex items-center justify-around py-3 px-4 rounded-xl bg-surface-overlay border border-white/8">
      <div className="text-center">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          {Math.round(WIN_ODDS * 100)}%
        </p>
        <p className="text-[10px] text-white/30 uppercase tracking-widest">Odds</p>
      </div>
      <div className="w-px h-6 bg-white/10" />
      <div className="text-center">
        <p className="text-sm font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>
          {WIN_MULTIPLIER}×
        </p>
        <p className="text-[10px] text-white/30 uppercase tracking-widest">Payout</p>
      </div>
      <div className="w-px h-6 bg-white/10" />
      <div className="text-center">
        <p className="text-sm font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>3</p>
        <p className="text-[10px] text-white/30 uppercase tracking-widest">Suits</p>
      </div>
    </div>
  );
}
