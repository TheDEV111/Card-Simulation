import WalletAvatar from "./WalletAvatar";
import TruncatedAddress from "./TruncatedAddress";
import STXAmount from "./STXAmount";
import { cn } from "../../utils/cn";

const RANK_STYLES = {
  1: "text-gold font-bold",
  2: "text-white/60 font-semibold",
  3: "text-win/80 font-semibold",
};

export default function LeaderboardRow({ entry }) {
  const { rank, address, wins, losses, winRate, pnl } = entry;
  const pnlPositive = pnl > 0;

  return (
    <div className="table-row grid grid-cols-[32px_auto_1fr_auto_auto_auto] items-center gap-4 px-4 py-3">
      <span className={cn("text-sm text-center", RANK_STYLES[rank] || "text-white/30")}>{rank}</span>
      <WalletAvatar address={address} size={32} />
      <TruncatedAddress address={address} />
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{wins}W</p>
        <p className="text-2xs text-white/30">{losses}L</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-white/60">{winRate}%</p>
        <p className="text-2xs text-white/30">win rate</p>
      </div>
      <div className={cn("text-right text-sm font-medium", pnlPositive ? "text-win" : "text-loss")}>
        {pnlPositive ? "+" : ""}<STXAmount microSTX={Math.abs(pnl)} accent={false} size="sm" />
      </div>
    </div>
  );
}
