import SearchBar from "../ui/SearchBar";
import ResultCount from "../ui/ResultCount";

export default function LeaderboardSearch({ value, onChange, total, filtered, className = "" }) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 ${className}`}>
      <SearchBar
        value={value}
        onChange={onChange}
        onClear={() => onChange("")}
        placeholder="Search by address…"
        className="flex-1"
      />
      <ResultCount count={filtered} total={total} noun="player" className="flex-shrink-0" />
    </div>
  );
}
