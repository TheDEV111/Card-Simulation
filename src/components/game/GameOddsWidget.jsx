import { WIN_ODDS, WIN_MULTIPLIER } from "../../utils/constants";

const STAT = ({ label, value, accent }) => (
  <div className="text-center px-4">
    <p
      className={`text-sm font-bold tabular-nums ${accent ? "text-gold" : "text-white"}`}
      style={{ fontFamily: "Cinzel, serif" }}
    >
      {value}
    </p>
    <p className="text-[10px] text-white/30 uppercase tracking-widest mt-0.5">{label}</p>
  </div>
);

export default function GameOddsWidget() {
  const expectedValue = ((WIN_ODDS * WIN_MULTIPLIER) - 1).toFixed(2);
  return (
    <div className="flex items-center justify-around py-3 rounded-xl bg-white/3 border border-white/6">
      <STAT label="Win Odds" value={`${Math.round(WIN_ODDS * 100)}%`} />
      <div className="w-px h-5 bg-white/8" />
      <STAT label="Payout" value={`${WIN_MULTIPLIER}×`} accent />
      <div className="w-px h-5 bg-white/8" />
      <STAT label="Suits" value="3" />
      <div className="w-px h-5 bg-white/8" />
      <STAT label="House Edge" value={`${Math.abs(parseFloat(expectedValue) * 100).toFixed(0)}%`} />
    </div>
  );
}
