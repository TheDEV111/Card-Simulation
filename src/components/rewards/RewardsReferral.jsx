import { useClipboard } from "../../hooks/useClipboard";
import { useWallet } from "../../hooks/useWallet";

export default function RewardsReferral({ className = "" }) {
  const { address } = useWallet();
  const { copy, copied } = useClipboard();

  const refLink = address
    ? `${window.location.origin}?ref=${address.slice(0, 10)}`
    : `${window.location.origin}`;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Refer a Friend</h3>
      <p className="text-xs text-white/40 leading-relaxed">
        Share your referral link. Earn <span className="text-gold">5 STX</span> when a referred player
        completes their first 5 games.
      </p>
      <div className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2">
        <span className="flex-1 text-xs font-mono text-white/50 truncate">{refLink}</span>
        <button
          onClick={() => copy(refLink)}
          className={`flex-shrink-0 text-xs px-3 py-1 rounded-full transition-colors ${
            copied ? "bg-win/20 text-win" : "bg-white/10 text-white/50 hover:bg-white/15"
          }`}
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: "Referrals", value: "0" },
          { label: "Qualified", value: "0" },
          { label: "Earned",    value: "0 STX" },
        ].map((s) => (
          <div key={s.label} className="space-y-0.5">
            <p className="text-sm font-semibold text-white/70">{s.value}</p>
            <p className="text-[10px] text-white/30">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
