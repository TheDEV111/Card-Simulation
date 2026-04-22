export const WIN_PROBABILITY = 1 / 3;
export const LOSS_PROBABILITY = 2 / 3;

export function expectedValue(stake, multiplier = 3) {
  return WIN_PROBABILITY * (stake * multiplier) - stake;
}

export function expectedROI(multiplier = 3) {
  return (WIN_PROBABILITY * multiplier) - 1;
}

export function houseEdge(multiplier = 3) {
  return 1 - WIN_PROBABILITY * multiplier;
}

export function binomialProbability(wins, trials) {
  const p = WIN_PROBABILITY;
  const q = 1 - p;
  const coeff = factorial(trials) / (factorial(wins) * factorial(trials - wins));
  return coeff * Math.pow(p, wins) * Math.pow(q, trials - wins);
}

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

export function ruinProbability(bankroll, stake, multiplier = 3) {
  const p = WIN_PROBABILITY;
  const q = 1 - p;
  if (p === q) return 1;
  const r = q / p;
  return (Math.pow(r, bankroll / stake) - Math.pow(r, Infinity)) / (1 - Math.pow(r, Infinity));
}
