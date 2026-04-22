import { CONTRACT_ADDRESS, CONTRACT_NAME, EXPLORER_BASE } from "../../utils/constants";
import TruncatedAddress from "./TruncatedAddress";
import ExternalLink from "./ExternalLink";
import InfoRow from "./InfoRow";

export default function ContractInfo() {
  return (
    <div className="panel px-5 divide-y divide-white/5">
      <InfoRow label="Network" value="Stacks Mainnet" />
      <div className="flex items-center justify-between py-3">
        <span className="text-sm text-white/40">Contract address</span>
        <TruncatedAddress address={CONTRACT_ADDRESS} chars={8} />
      </div>
      <InfoRow label="Contract name" value={CONTRACT_NAME} />
      <div className="py-3">
        <ExternalLink href={`${EXPLORER_BASE}/address/${CONTRACT_ADDRESS}?chain=mainnet`}>
          View on Stacks Explorer
        </ExternalLink>
      </div>
    </div>
  );
}
