import { useLeaderboard } from "../hooks/useLeaderboard";
import PageHeader from "../components/ui/PageHeader";
import SearchInput from "../components/ui/SearchInput";
import LeaderboardRow from "../components/ui/LeaderboardRow";
import Pagination from "../components/ui/Pagination";
import EmptyState from "../components/ui/EmptyState";
import GlobalStatsBar from "../components/ui/GlobalStatsBar";
import { SkeletonLine } from "../components/ui/Skeleton";
import RankBadge from "../components/ui/RankBadge";
import STXAmount from "../components/ui/STXAmount";

export default function LeaderboardPage() {
  const {
    players, loading,
    search, setSearch,
    page, setPage, totalPages,
  } = useLeaderboard();

  const top3 = players.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <PageHeader title="Leaderboard" subtitle="The top players by total wins." />

      <GlobalStatsBar />

      {/* Podium */}
      {!loading && top3.length >= 3 && (
        <div className="grid grid-cols-3 gap-4">
          {[1, 0, 2].map((idx) => {
            const p = top3[idx];
            if (!p) return <div key={idx} />;
            return (
              <div key={p.address} className={`panel p-4 text-center space-y-2 ${idx === 0 ? "lg:scale-105" : "opacity-90"}`}>
                <RankBadge rank={idx + 1} />
                <p className="text-xs text-white/40 truncate font-mono">{p.address.slice(0, 10)}…</p>
                <p className="text-sm font-bold text-white">{p.wins}W</p>
                <p className="text-xs text-white/30"><STXAmount ustx={p.totalPayout} /></p>
              </div>
            );
          })}
        </div>
      )}

      {/* Search */}
      <SearchInput value={search} onChange={setSearch} placeholder="Search by address…" />

      {/* Table */}
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto] text-xs text-white/30 uppercase tracking-wider px-4 py-3 border-b border-white/5 gap-4">
          <span>#</span>
          <span>Player</span>
          <span>Games</span>
          <span>Wins</span>
          <span>Payout</span>
        </div>

        {loading ? (
          <div className="p-4 space-y-3">
            {[...Array(10)].map((_, i) => <SkeletonLine key={i} />)}
          </div>
        ) : players.length === 0 ? (
          <EmptyState icon="🏆" title="No players found" description="Try a different search." />
        ) : (
          <div className="divide-y divide-white/5">
            {players.map((player, i) => (
              <LeaderboardRow
                key={player.address}
                player={player}
                rank={(page - 1) * 10 + i + 1}
              />
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
  );
}
