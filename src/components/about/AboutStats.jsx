const STATS = [
  { label: "Win odds",    value: "1 in 3",    sub: "33.3% chance" },
  { label: "Payout",      value: "2×",         sub: "on a match" },
  { label: "Min stake",   value: "0.001 STX",  sub: "per round" },
  { label: "Max stake",   value: "1 STX",      sub: "per round" },
  { label: "House edge",  value: "~33%",       sub: "provably fair" },
  { label: "Settlement",  value: "On-chain",   sub: "Stacks mainnet" },
];

export default function AboutStats() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold text-white tracking-tight">
        Game stats
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {STATS.map(({ label, value, sub }) => (
          <div
            key={label}
            className="bg-surface-raised rounded-2xl px-4 py-4 border border-white/5 space-y-1"
          >
            <p className="text-xs text-white/30 uppercase tracking-widest">
              {label}
            </p>
            <p className="text-xl font-bold text-gold leading-none">{value}</p>
            <p className="text-xs text-white/30">{sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
