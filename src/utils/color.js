export function outcomeColor(outcome) {
  return outcome === "win" ? "#34d399" : "#f87171";
}

export function pnlColor(value) {
  if (value > 0) return "text-win";
  if (value < 0) return "text-loss";
  return "text-white/40";
}

export function rankColor(rank) {
  if (rank === 1) return "text-gold";
  if (rank === 2) return "text-white/70";
  if (rank === 3) return "text-amber-600";
  return "text-white/40";
}

export function winRateColor(rate) {
  if (rate >= 40) return "text-win";
  if (rate >= 25) return "text-gold";
  return "text-loss";
}
