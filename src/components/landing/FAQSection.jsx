import { useState } from "react";
import ExpandCollapse from "../ui/ExpandCollapse";

const FAQS = [
  {
    q: "Is this game fair?",
    a: "Yes. The draw is executed by a Clarity smart contract on the Stacks blockchain. The contract code is publicly auditable on the Stacks explorer. No server can influence the outcome.",
  },
  {
    q: "How are winnings paid out?",
    a: "Instantly. When you win, the smart contract transfers 3× your stake directly to your wallet in the same transaction. There's no withdrawal step.",
  },
  {
    q: "What wallets are supported?",
    a: "Hiro Wallet and Xverse are both fully supported. Any Stacks-compatible wallet that supports the connect protocol should work.",
  },
  {
    q: "Is there a minimum or maximum stake?",
    a: "The minimum stake is 1 STX. The maximum per game is 100 STX, enforced by the smart contract.",
  },
  {
    q: "Why is the house edge 33%?",
    a: "The payout is 3× on a 1-in-3 chance, which is mathematically breakeven. We take no house cut — the expected value per game is exactly −0 STX. The 33% figure in the stats refers to the fraction of games we'd win, which equals the win probability.",
  },
];

export default function FAQSection({ className = "" }) {
  const [open, setOpen] = useState(null);

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-white text-center" style={{ fontFamily: "Cinzel, serif" }}>FAQ</h2>
        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <div key={i} className="panel overflow-hidden">
              <button
                className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-white/70 hover:text-white/90 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <span className={`text-white/30 transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
              </button>
              <ExpandCollapse open={open === i}>
                <p className="px-4 pb-4 text-xs text-white/40 leading-relaxed">{faq.a}</p>
              </ExpandCollapse>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
