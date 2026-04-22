export const CARD_NAMES = { 1: "Spades", 2: "Diamonds", 3: "Clubs" };
export const CARD_SYMBOLS = { 1: "♠", 2: "♦", 3: "♣" };

export const WIN_MULTIPLIER = 3;
export const WIN_PROBABILITY = 1 / 3;

export function isWin(outcome) { return outcome === "win"; }

export function calcPayout(stake, outcome) {
  return outcome === "win" ? stake * WIN_MULTIPLIER : 0;
}

export function calcPnL(stake, payout) { return payout - stake; }

export function cardName(id) { return CARD_NAMES[id] ?? "Unknown"; }
export function cardSymbol(id) { return CARD_SYMBOLS[id] ?? "?"; }

export function formatOutcome(outcome) {
  return outcome === "win" ? "Win" : "Loss";
}

export function streakLabel(streak) {
  if (streak >= 5) return `${streak}x Hot Streak 🔥`;
  if (streak >= 3) return `${streak}x Win Streak`;
  if (streak >= 1) return `${streak}x Streak`;
  return null;
}
