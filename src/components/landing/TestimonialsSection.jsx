import TruncatedAddress from "../ui/TruncatedAddress";

const TESTIMONIALS = [
  {
    address: "SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ",
    quote: "Won 150 STX on my second game. The contract paid instantly — no waiting.",
    stars: 5,
  },
  {
    address: "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE",
    quote: "Love that I can verify the draw myself on the explorer. True provable fairness.",
    stars: 5,
  },
  {
    address: "SP1NXBK3K5YYMD6FD41MVNP3JS1GABZ8TRVX023PT",
    quote: "Best Stacks dapp I've played. Simple, fast, and the leaderboard is addicting.",
    stars: 4,
  },
];

export default function TestimonialsSection({ className = "" }) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-8">
        <h2
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Players love it
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="panel p-5 space-y-3">
              <p className="text-xs text-white/50 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center justify-between">
                <TruncatedAddress address={t.address} chars={6} className="text-[10px] font-mono text-white/25" />
                <span className="text-xs text-gold">{"★".repeat(t.stars)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
