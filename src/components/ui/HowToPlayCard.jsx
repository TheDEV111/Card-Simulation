import StepCard from "./StepCard";

const STEPS = [
  {
    number: "01",
    title: "Connect your Stacks wallet",
    description: "Use Leather or Xverse to connect. Your wallet address is your player identity — no sign-up needed.",
  },
  {
    number: "02",
    title: "Choose your card",
    description: "Pick one of three suits: Spade ♠, Heart ♥, or Diamond ♦. Each has exactly 1-in-3 odds.",
  },
  {
    number: "03",
    title: "Set your stake",
    description: "Wager between 0.001 STX and 1 STX. The amount is locked into the contract call.",
  },
  {
    number: "04",
    title: "The contract draws",
    description: "A smart contract on Stacks draws a card on-chain. Match it and receive 2× your stake instantly.",
  },
];

export default function HowToPlayCard() {
  return (
    <div className="space-y-3">
      {STEPS.map((step) => (
        <StepCard key={step.number} {...step} />
      ))}
    </div>
  );
}
