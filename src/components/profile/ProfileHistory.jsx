import { useState } from "react";
import { useGameHistory } from "../../hooks/useGameHistory";
import GameHistoryRow from "../ui/GameHistoryRow";
import FilterBar from "../ui/FilterBar";
import SearchBar from "../ui/SearchBar";
import SmartPagination from "../ui/SmartPagination";
import EmptyResults from "../ui/EmptyResults";

const FILTERS = [
  { value: "all",  label: "All" },
  { value: "win",  label: "Wins" },
  { value: "loss", label: "Losses" },
];

export default function ProfileHistory({ className = "" }) {
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");
  const { games, totalPages, page, setPage } = useGameHistory({ filter, search });

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Game History</h3>
      <FilterBar options={FILTERS} value={filter} onChange={setFilter} />
      <SearchBar value={search} onChange={setSearch} onClear={() => setSearch("")} placeholder="Search by tx ID…" />
      <div className="divide-y divide-white/5">
        {games.length === 0
          ? <EmptyResults query={search} onClear={() => setSearch("")} />
          : games.map((g) => <GameHistoryRow key={g.id} game={g} />)
        }
      </div>
      {totalPages > 1 && <SmartPagination page={page} totalPages={totalPages} onPage={setPage} />}
    </div>
  );
}
