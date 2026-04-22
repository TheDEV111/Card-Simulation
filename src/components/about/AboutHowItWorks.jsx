const STEPS = [
  {
    number: "01",
    title: "Connect your wallet",
    description:
      "Link your Stacks wallet (Leather or Xverse) to authenticate. No sign-up required — your wallet is your identity.",
  },
  {
    number: "02",
    title: "Pick a card",
    description:
      "Choose one of three cards: Spade ♠, Heart ♥, or Diamond ♦. Each has an equal 1-in-3 chance of matching the contract's draw.",
  },
  {
    number: "03",
    title: "Set your stake",
    description:
      "Enter how much STX you want to wager — anywhere from 0.001 STX up to 1 STX. Your stake is locked into the contract call.",
  },
  {
    number: "04",
    title: "Play & get paid",
    description:
      "The smart contract draws a card on-chain. Match it and you receive 2× your stake back instantly. No match, no worries — try again.",
  },
];

export default function AboutHowItWorks() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold text-white tracking-tight">
        How it works
      </h2>
      <div className="space-y-3">
        {STEPS.map((step) => (
          <div
            key={step.number}
            className="flex gap-4 bg-surface-raised rounded-2xl p-5 border border-white/5"
          >
            <span className="text-xl font-bold text-gold/40 tabular-nums leading-none mt-0.5 shrink-0">
              {step.number}
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold text-white">{step.title}</p>
              <p className="text-xs text-white/40 leading-relaxed">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
