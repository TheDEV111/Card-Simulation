import { useDismissable } from "../../hooks/useDismissable";

export default function LandingAnnouncementBanner() {
  const [visible, dismiss] = useDismissable("launch-banner");

  if (!visible) return null;

  return (
    <div className="bg-gold/10 border-b border-gold/20 px-4 py-2.5">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <p className="text-xs text-gold/90 text-center flex-1">
          <span className="font-semibold">Now live on Stacks Mainnet</span>
          {" — "}Provably fair card draws, instant on-chain payouts.
        </p>
        <button
          onClick={dismiss}
          className="text-gold/50 hover:text-gold transition-colors text-lg leading-none flex-shrink-0"
          aria-label="Dismiss announcement"
        >
          ×
        </button>
      </div>
    </div>
  );
}
