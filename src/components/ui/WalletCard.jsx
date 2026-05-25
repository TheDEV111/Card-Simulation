import { formatSTX } from "../../utils/currency";
import { truncateMiddle } from "../../utils/text";

export default function WalletCard({ address, balance, network = "mainnet", onCopy, className = "" }) {
  const isMainnet = network === "mainnet";
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 p-5 text-white shadow-xl ${className}`}>
      <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-6 -left-4 h-24 w-24 rounded-full bg-white/5" />
      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-200">
            {isMainnet ? "Mainnet" : "Testnet"} Wallet
          </p>
          {!isMainnet && (
            <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-xs font-medium text-amber-300">Testnet</span>
          )}
        </div>
        <p className="mt-4 text-3xl font-bold tabular-nums">{formatSTX(balance)} <span className="text-lg font-medium text-indigo-200">STX</span></p>
        <button
          onClick={onCopy}
          className="mt-4 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-xs font-mono text-indigo-100 hover:bg-white/20 transition-colors"
        >
          {truncateMiddle(address ?? "", 24)}
          <span className="opacity-60">⎘</span>
        </button>
      </div>
    </div>
  );
}
