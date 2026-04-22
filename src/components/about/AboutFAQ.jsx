import { useState } from "react";

const FAQS = [
  {
    q: "Is the game provably fair?",
    a: "Yes. The card draw is executed entirely by the smart contract on the Stacks blockchain. The outcome is derived from on-chain entropy — no server, no operator, no manipulation.",
  },
  {
    q: "Which wallets are supported?",
    a: "Any Stacks-compatible wallet works, including Leather (formerly Hiro Wallet) and Xverse. You just need STX for stakes and transaction fees.",
  },
  {
    q: "What are the transaction fees?",
    a: "Stacks transaction fees are separate from your stake and are paid in STX. Fees vary based on network congestion but are typically a few hundred µSTX.",
  },
  {
    q: "How fast is the payout?",
    a: "Payouts happen within the same transaction once the contract confirms on-chain, which typically takes under a minute on Stacks mainnet.",
  },
  {
    q: "Can I lose more than my stake?",
    a: "No. The maximum you can lose per round is your stake. Fees are the only additional cost and are visible before you confirm in your wallet.",
  },
  {
    q: "Where is the contract deployed?",
    a: "The contract is deployed on Stacks mainnet. You can inspect it at any time on the Stacks Explorer using the contract address shown on the game screen.",
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-surface-overlay transition-colors duration-150"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-sm font-medium text-white/80">{q}</span>
        <span
          className={[
            "text-gold text-lg leading-none transition-transform duration-200 shrink-0",
            open ? "rotate-45" : "rotate-0",
          ].join(" ")}
        >
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-xs text-white/40 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function AboutFAQ() {
  return (
    <section className="space-y-5">
      <h2 className="text-lg font-semibold text-white tracking-tight">
        FAQ
      </h2>
      <div className="space-y-2">
        {FAQS.map((item) => (
          <FAQItem key={item.q} {...item} />
        ))}
      </div>
    </section>
  );
}
