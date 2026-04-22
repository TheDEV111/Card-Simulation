import { useTransactions } from "../hooks/useTransactions";
import ConnectWalletGate from "../components/ui/ConnectWalletGate";
import PageHeader from "../components/ui/PageHeader";
import TransactionRow from "../components/ui/TransactionRow";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import SearchInput from "../components/ui/SearchInput";
import { useState } from "react";
import { SkeletonLine } from "../components/ui/Skeleton";

export default function TransactionsPage() {
  const { transactions, loading, page, setPage, totalPages } = useTransactions();
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((tx) =>
    !search || tx.txId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ConnectWalletGate>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        <PageHeader title="Transactions" subtitle="Your complete on-chain transaction history." />

        <SearchInput value={search} onChange={setSearch} placeholder="Search by TX ID…" />

        <div className="panel overflow-hidden">
          <div className="flex text-xs text-white/30 uppercase tracking-wider px-4 py-3 border-b border-white/5 gap-4">
            <span className="flex-1">Transaction</span>
            <span>Type</span>
            <span className="w-20 text-right">Amount</span>
            <span className="w-24 text-right">Date</span>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(8)].map((_, i) => <SkeletonLine key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState icon="📋" title="No transactions" description="Your on-chain activity will appear here." />
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map((tx) => (
                <TransactionRow key={tx.txId} transaction={tx} />
              ))}
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center">
            <Pagination page={page} totalPages={totalPages} onChange={setPage} />
          </div>
        )}
      </div>
    </ConnectWalletGate>
  );
}
