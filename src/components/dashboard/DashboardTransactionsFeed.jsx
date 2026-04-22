import { useTransactions } from "../../hooks/useTransactions";
import TransactionRow from "../ui/TransactionRow";
import EmptyState from "../ui/EmptyState";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { SkeletonLine } from "../ui/Skeleton";

export default function DashboardTransactionsFeed() {
  const { transactions, loading } = useTransactions();
  const recent = transactions.slice(0, 5);

  return (
    <div className="panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="label-caps">Transactions</p>
        <Link to={ROUTES.TRANSACTIONS} className="text-xs text-gold/70 hover:text-gold transition-colors">
          All →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => <SkeletonLine key={i} />)}
        </div>
      ) : recent.length === 0 ? (
        <EmptyState icon="📋" title="No transactions" description="Your transaction history will appear here." />
      ) : (
        <div className="divide-y divide-white/5">
          {recent.map((tx) => (
            <TransactionRow key={tx.txId} transaction={tx} />
          ))}
        </div>
      )}
    </div>
  );
}
