const TRUST_ITEMS = [
  { icon: "⛓", label: "Stacks Mainnet", title: "All transactions on the Stacks L2 blockchain" },
  { icon: "🔓", label: "Open source", title: "Contract and frontend code publicly available" },
  { icon: "🛡", label: "Non-custodial", title: "Funds stay in your wallet until the contract call confirms" },
  { icon: "⚡", label: "Instant payout", title: "Winnings paid within the same transaction" },
];

export default function LandingTrustBar() {
  return (
    <div className="flex items-center justify-center gap-6 sm:gap-10 py-4 px-6 border-y border-white/5 flex-wrap">
      {TRUST_ITEMS.map((item) => (
        <div
          key={item.label}
          title={item.title}
          className="flex items-center gap-2 text-white/30 hover:text-white/50 transition-colors cursor-default"
        >
          <span className="text-sm">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
