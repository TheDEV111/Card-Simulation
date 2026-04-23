import StaggerGroup from "../ui/StaggerGroup";

const STEPS = [
  {
    num: "01",
    title: "Connect your wallet",
    body: "Link your Hiro or Xverse wallet. No sign-up, no KYC — just your Stacks address.",
  },
  {
    num: "02",
    title: "Pick a suit & stake",
    body: "Choose Spades, Diamonds, or Clubs and decide how much STX to wager.",
  },
  {
    num: "03",
    title: "The contract draws",
    body: "A Clarity smart contract draws a random suit. Match it and win 3× your stake.",
  },
];

export default function HowItWorksSection({ className = "" }) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-10">
        <h2
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          How it works
        </h2>
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.num} className="space-y-3">
              <p className="text-4xl font-bold text-white/8" style={{ fontFamily: "Cinzel, serif" }}>{s.num}</p>
              <h3 className="text-sm font-semibold text-white/80">{s.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
