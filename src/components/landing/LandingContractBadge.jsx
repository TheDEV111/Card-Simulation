import { CONTRACT_ADDRESS, CONTRACT_NAME, EXPLORER_BASE } from "../../utils/constants";
import ExternalLink from "../ui/ExternalLink";

export default function LandingContractBadge() {
  const url = `${EXPLORER_BASE}/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

  return (
    <ExternalLink href={url} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-raised border border-white/10 hover:border-gold/40 transition-colors group">
      <span className="w-1.5 h-1.5 rounded-full bg-win animate-pulse" />
      <span className="text-xs text-white/50 group-hover:text-white/80 transition-colors font-mono">
        {CONTRACT_ADDRESS.slice(0, 8)}…{CONTRACT_ADDRESS.slice(-4)}.{CONTRACT_NAME}
      </span>
    </ExternalLink>
  );
}
