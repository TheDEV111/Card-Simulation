import { useWallet } from "../../hooks/useWallet";
import { useWalletBalance } from "../../hooks/useWalletBalance";
import { useContractInfo } from "../../hooks/useContractInfo";
import { truncateAddress, explorerTxUrl } from "../../utils/stacks";
import STXAmount from "../ui/STXAmount";
import SettingsSection from "./SettingsSection";
import StatRow from "../ui/StatRow";
import CopyButton from "../ui/CopyButton";

export default function SettingsWallet() {
  const { address, disconnect } = useWallet();
  const { balance } = useWalletBalance();
  const contract = useContractInfo();

  if (!address) {
    return (
      <SettingsSection title="Wallet" description="Connect a Stacks wallet to play.">
        <p className="text-sm text-white/40">No wallet connected.</p>
      </SettingsSection>
    );
  }

  return (
    <SettingsSection title="Wallet" description="Your connected Stacks wallet details.">
      <div className="panel p-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-white/60">{truncateAddress(address, 12)}</span>
          <CopyButton text={address} />
        </div>
        <StatRow label="Balance" value={<STXAmount ustx={balance ?? 0} />} />
        <StatRow
          label="Contract"
          value={
            <a
              href={explorerTxUrl(contract.address)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gold hover:underline font-mono"
            >
              {truncateAddress(contract.address, 10)}
            </a>
          }
        />
      </div>
      <button
        onClick={disconnect}
        className="text-xs text-loss/70 hover:text-loss transition-colors px-3 py-1.5 rounded-lg hover:bg-loss/10"
      >
        Disconnect wallet
      </button>
    </SettingsSection>
  );
}
