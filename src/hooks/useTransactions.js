import { useState, useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

const PER_PAGE = 15;

export function useTransactions() {
  const [page, setPage] = useState(1);
  const [loading]       = useState(false);

  const all = useMemo(() => MOCK_GAMES.map((g) => ({
    txId:      g.txId,
    type:      "game",
    outcome:   g.outcome,
    stake:     g.stake,
    payout:    g.payout,
    net:       g.payout - g.stake,
    timestamp: g.timestamp,
    player:    g.player,
  })), []);

  const totalPages = Math.ceil(all.length / PER_PAGE);

  const transactions = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return all.slice(start, start + PER_PAGE);
  }, [all, page]);

  return { transactions, loading, total: all.length, page, setPage, totalPages, perPage: PER_PAGE };
}
