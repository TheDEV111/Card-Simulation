import { MOCK_LEADERBOARD } from "../../utils/mockData";
import TruncatedAddress from "../ui/TruncatedAddress";
import STXAmount from "../ui/STXAmount";
import Marquee from "../ui/Marquee";

export default function TopWinnersStrip({ className = "" }) {
  const items = MOCK_LEADERBOARD.slice(0, 5).map((p) => (
    <span key={p.address} className="flex items-center gap-3 px-6">
      <span className="text-gold font-semibold text-xs">#{p.rank}</span>
      <TruncatedAddress address={p.address} chars={6} className="text-xs font-mono text-white/50" />
      <span className="text-xs text-win">+<STXAmount ustx={p.totalPayout - p.totalStaked} /></span>
    </span>
  ));

  return (
    <div className={`border-y border-white/5 py-2 bg-white/2 ${className}`}>
      <Marquee speed={30}>{items}</Marquee>
    </div>
  );
}
