const TRUST_ITEMS = [
  { icon: "🔗", label: "Stacks Mainnet" },
  { icon: "🔓", label: "Open source" },
  { icon: "🛡️", label: "Non-custodial" },
  { icon: "⚡", label: "Instant payout" },
];

export default function LandingTrustBar() {
  return (
    <div className="flex items-center justify-center gap-8 py-4 px-6 border-y border-white/5 flex-wrap">
      {TRUST_ITEMS.map((item) => (
        <div key={item.label} className="flex items-center gap-2 text-white/30">
          <span className="text-sm">{item.icon}</span>
          <span className="text-xs">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
