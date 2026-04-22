import GameBadge from "./GameBadge";
import PnLDisplay from "./PnLDisplay";
import TransactionLink from "./TransactionLink";
import { formatRelativeTime } from "../../utils/format";

export default function TransactionRow({ tx }) {
  return (
    <div className="table-row grid grid-cols-[auto_1fr_auto_auto] items-center gap-4 px-4 py-3">
      <GameBadge outcome={tx.outcome} />
      <TransactionLink txId={tx.txId} />
      <PnLDisplay microSTX={tx.net} size="sm" />
      <span className="text-2xs text-white/20">{formatRelativeTime(tx.timestamp)}</span>
    </div>
  );
}
