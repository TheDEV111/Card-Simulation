import ContractInfo from "../ui/ContractInfo";
import ExternalLink from "../ui/ExternalLink";
import { CONTRACT_ADDRESS, CONTRACT_NAME, EXPLORER_BASE } from "../../utils/constants";

export default function GameContractBadge() {
  const url = `${EXPLORER_BASE}/address/${CONTRACT_ADDRESS}.${CONTRACT_NAME}`;

  return (
    <ExternalLink
      href={url}
      className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/50 transition-colors"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-win" />
      <span className="font-mono">
        {CONTRACT_ADDRESS.slice(0, 6)}…{CONTRACT_ADDRESS.slice(-4)}.{CONTRACT_NAME}
      </span>
    </ExternalLink>
  );
}
