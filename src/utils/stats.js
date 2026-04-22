export function calculateWinRate(wins, total) {
  if (!total) return 0;
  return Math.round((wins / total) * 100);
}

export function calculatePnL(games) {
  return games.reduce((acc, g) => {
    const staked = Number(g.stake ?? 0);
    const payout = Number(g.payout ?? 0);
    return acc + payout - staked;
  }, 0);
}

export function calculateStreak(games) {
  let streak = 0;
  for (const g of [...games].reverse()) {
    if (g.outcome === "win") streak++;
    else break;
  }
  return streak;
}

export function groupByDate(games) {
  return games.reduce((acc, g) => {
    const key = new Date(g.timestamp).toDateString();
    if (!acc[key]) acc[key] = [];
    acc[key].push(g);
    return acc;
  }, {});
}
