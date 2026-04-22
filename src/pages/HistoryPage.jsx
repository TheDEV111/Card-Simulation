import { useGameHistory } from "../hooks/useGameHistory";
import PageHeader from "../components/ui/PageHeader";
import { FilterChipGroup } from "../components/ui/FilterChip";
import SearchInput from "../components/ui/SearchInput";
import GameHistoryRow from "../components/ui/GameHistoryRow";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import StatCard from "../components/ui/StatCard";
import ConnectWalletGate from "../components/ui/ConnectWalletGate";
import { SkeletonLine } from "../components/ui/Skeleton";
import { formatSTX } from "../utils/format";

const FILTER_OPTIONS = [
  { label: "All",    value: "all"  },
  { label: "Wins",   value: "win"  },
  { label: "Losses", value: "loss" },
];

export default function HistoryPage() {
  const {
    games, loading, filter, setFilter,
    search, setSearch, page, setPage,
    totalPages, stats,
  } = useGameHistory();

  return (
    <ConnectWalletGate>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        <PageHeader title="Game History" subtitle="All your past rounds in one place." />

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard label="Total games"  value={stats.total} />
          <StatCard label="Wins"         value={stats.wins} trend="up" />
          <StatCard label="Losses"       value={stats.losses} trend="down" />
          <StatCard label="Net P&L"      value={formatSTX(stats.pnl)} trend={stats.pnl >= 0 ? "up" : "down"} />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-3">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Search by TX ID…"
            className="flex-1"
          />
          <FilterChipGroup
            options={FILTER_OPTIONS}
            value={filter}
            onChange={setFilter}
          />
        </div>

        {/* Table */}
        <div className="panel overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] text-xs text-white/30 uppercase tracking-wider px-4 py-3 border-b border-white/5">
            <span>Transaction</span>
            <span className="px-4">Card</span>
            <span className="px-4">Stake</span>
            <span className="px-4">Result</span>
          </div>

          {loading ? (
            <div className="p-4 space-y-3">
              {[...Array(8)].map((_, i) => <SkeletonLine key={i} />)}
            </div>
          ) : games.length === 0 ? (
            <EmptyState
              icon="🃏"
              title="No games found"
              description={filter !== "all" ? "Try clearing the filter." : "Play your first game to see history here."}
            />
          ) : (
            <div className="divide-y divide-white/5">
              {games.map((game) => (
                <GameHistoryRow key={game.txId} game={game} />
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
