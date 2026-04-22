import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

export function useHotCard(window = 20) {
  return useMemo(() => {
    const recent = [...MOCK_GAMES]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, window);

    const counts = { 1: 0, 2: 0, 3: 0 };
    const wins   = { 1: 0, 2: 0, 3: 0 };
    recent.forEach((g) => {
      counts[g.contractCard]++;
      if (g.contractCard === g.card) wins[g.card]++;
    });

    const hotSuit = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
    return {
      suit:     Number(hotSuit),
      count:    counts[hotSuit],
      winRate:  Math.round((wins[hotSuit] / Math.max(counts[hotSuit], 1)) * 100),
      window,
    };
  }, [window]);
}
