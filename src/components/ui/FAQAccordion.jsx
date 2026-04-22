import { Accordion } from "./Accordion";

const FAQS = [
  {
    title: "Is the game provably fair?",
    content: "Yes. Every card draw is executed by a smart contract on the Stacks blockchain. The outcome is derived from on-chain entropy — no server, no operator, no manipulation.",
  },
  {
    title: "Which wallets are supported?",
    content: "Any Stacks-compatible wallet works, including Leather (formerly Hiro Wallet) and Xverse. You just need STX for stakes and transaction fees.",
  },
  {
    title: "How fast is the payout?",
    content: "Payouts happen within the same transaction once the contract confirms, which typically takes under a minute on Stacks mainnet.",
  },
  {
    title: "What are the odds?",
    content: "You pick one of three cards. The contract also draws one of three. If they match, you win 2× your stake. That's a 33.3% chance of winning per round.",
  },
  {
    title: "Can I lose more than my stake?",
    content: "No. The maximum loss per round is your stake. Transaction fees are additional and visible before you confirm in your wallet.",
  },
  {
    title: "Where is the contract deployed?",
    content: "The contract is deployed on Stacks mainnet. You can inspect it at any time on the Stacks Explorer using the contract address shown on the game screen.",
  },
];

export default function FAQAccordion() {
  return <Accordion items={FAQS} />;
}
