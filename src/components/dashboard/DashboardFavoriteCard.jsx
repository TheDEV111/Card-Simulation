import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import SuitIcon from "../ui/SuitIcon";

export default function DashboardFavoriteCard() {
  const fav = useMemo(() => {
    const counts = { 1: 0, 2: 0, 3: 0 };
    const wins   = { 1: 0, 2: 0, 3: 0 };
    MOCK_GAMES.slice(0, 30).forEach((g) => {
      counts[g.card]++;
      if (g.outcome === "win") wins[g.card]++;
    });
    const suit = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
    return { suit: Number(suit[0]), plays: suit[1], wins: wins[suit[0]] };
  }, []);

  return (
    <div className="panel p-5 flex items-center justify-between">
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-1">Favorite Pick</h3>
        <p className="text-sm text-white/70">{fav.plays} plays · {fav.wins} wins</p>
      </div>
      <div className="flex flex-col items-center gap-1">
        <SuitIcon suit={fav.suit} size="xl" />
        <span className="text-[10px] text-white/30 uppercase tracking-widest">
          {["", "Spades", "Diamonds", "Clubs"][fav.suit]}
        </span>
      </div>
    </div>
  );
}
