const RULES = [
  "Pick one of three suits: ♠ Spades, ♥ Hearts, or ♦ Diamonds.",
  "Set your stake between the minimum and maximum allowed.",
  "The contract draws a suit at random on-chain.",
  "Match the drawn suit → win 3× your stake. Miss → lose.",
];

export default function LandingRulesCard() {
  return (
    <div className="panel p-5 space-y-4">
      <p className="label-caps">The rules</p>
      <ol className="space-y-3">
        {RULES.map((rule, i) => (
          <li key={i} className="flex gap-3 text-sm text-white/60 leading-relaxed">
            <span
              className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs flex items-center justify-center font-bold"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              {i + 1}
            </span>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}
