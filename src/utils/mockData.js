function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const ADDRESSES = [
  "SP19AHC15QDZJPDHTF5WQWKKZC6RE38W9D6VC56EH",
  "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7",
  "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
  "SP1HTBVD3JG9C05J7HBJTHGR0GGW7KXW28M5JS8QE",
  "SP2C2YFP12AJZB4MABJBAJ2Z5PQTE8M6YMPZBXKX8",
];

function makeGame(i) {
  const outcome    = Math.random() < 0.333 ? "win" : "loss";
  const card       = rand(1, 3);
  const contractCard = outcome === "win" ? card : ((card % 3) + 1);
  const stake      = rand(1000, 1_000_000);
  const payout     = outcome === "win" ? stake * 3 : 0;
  const now        = Date.now();
  return {
    id:           `tx${i}`,
    txId:         Array.from({ length: 40 }, () => "0123456789abcdef"[rand(0, 15)]).join(""),
    outcome,
    card,
    contractCard,
    stake,
    payout,
    timestamp:    new Date(now - i * 3_600_000 * rand(1, 6)).toISOString(),
    player:       ADDRESSES[i % ADDRESSES.length],
  };
}

export const MOCK_GAMES = Array.from({ length: 120 }, (_, i) => makeGame(i));

export const MOCK_LEADERBOARD = ADDRESSES.map((address, i) => {
  const games = MOCK_GAMES.filter((g) => g.player === address);
  const wins  = games.filter((g) => g.outcome === "win").length;
  return {
    rank:    i + 1,
    address,
    games:   games.length,
    wins,
    losses:  games.length - wins,
    winRate: Math.round((wins / Math.max(games.length, 1)) * 100),
    pnl:          games.reduce((s, g) => s + g.payout - g.stake, 0),
    totalPayout:  games.filter((g) => g.outcome === "win").reduce((s, g) => s + g.payout, 0),
  };
}).sort((a, b) => b.wins - a.wins).map((p, i) => ({ ...p, rank: i + 1 }));
