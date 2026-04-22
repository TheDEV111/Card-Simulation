import { useState } from "react";
import { MOCK_LEADERBOARD } from "../../utils/mockData";
import STXAmount from "../ui/STXAmount";
import TruncatedAddress from "../ui/TruncatedAddress";
import WinLossBar from "../ui/WinLossBar";
import RankBadge from "../ui/RankBadge";
import SmartPagination from "../ui/SmartPagination";

const PAGE_SIZE = 10;

export default function LeaderboardTable({ filter = "", className = "" }) {
  const [page, setPage] = useState(1);

  const filtered = MOCK_LEADERBOARD.filter((p) =>
    !filter || p.address.toLowerCase().includes(filter.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full" aria-label="Leaderboard">
          <thead>
            <tr className="border-b border-white/8">
              {["Rank", "Player", "Games", "Win Rate", "Total Won"].map((h) => (
                <th key={h} scope="col" className="px-4 py-3 text-left text-xs font-semibold text-white/30 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paged.map((player) => (
              <tr key={player.address} className="hover:bg-white/3 transition-colors">
                <td className="px-4 py-3"><RankBadge rank={player.rank} /></td>
                <td className="px-4 py-3"><TruncatedAddress address={player.address} chars={6} /></td>
                <td className="px-4 py-3 text-sm text-white/50">{player.games}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 min-w-[100px]">
                    <WinLossBar wins={player.wins} losses={player.losses} />
                    <span className="text-xs text-white/40 whitespace-nowrap">{player.winRate}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-semibold text-gold">
                  <STXAmount ustx={player.totalPayout} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          <SmartPagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      )}
    </div>
  );
}
