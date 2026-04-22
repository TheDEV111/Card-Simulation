import { useState, useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

const PER_PAGE = 15;

export function useTransactions(address) {
  const [page, setPage] = useState(1);

  const all = useMemo(() => {
    const games = address
      ? MOCK_GAMES.filter((g) => g.player === address)
      : MOCK_GAMES.slice(0, 30);

    return games.map((g) => ({
      txId:      g.txId,
      type:      "game",
      outcome:   g.outcome,
      stake:     g.stake,
      payout:    g.payout,
      net:       g.payout - g.stake,
      timestamp: g.timestamp,
    }));
  }, [address]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return all.slice(start, start + PER_PAGE);
  }, [all, page]);

  return { transactions: paginated, total: all.length, page, setPage, perPage: PER_PAGE };
}
