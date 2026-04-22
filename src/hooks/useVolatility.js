import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

export function useVolatility(window = 30) {
  return useMemo(() => {
    const recent = MOCK_GAMES.slice(0, window);
    const pnls   = recent.map((g) => g.payout - g.stake);
    const mean   = pnls.reduce((s, v) => s + v, 0) / pnls.length;
    const variance = pnls.reduce((s, v) => s + Math.pow(v - mean, 2), 0) / pnls.length;
    const stdDev = Math.sqrt(variance);
    const sharpe = stdDev === 0 ? 0 : mean / stdDev;
    return { mean, stdDev, sharpe: sharpe.toFixed(2), window };
  }, [window]);
}
