import STXAmount from "./STXAmount";
import LiveIndicator from "./LiveIndicator";

const MOCK_BALANCE = 5_420_000;

export default function WalletBalance({ address }) {
  if (!address) return null;
  return (
    <div className="panel px-5 py-4 flex items-center justify-between">
      <div className="space-y-0.5">
        <p className="label-caps">Wallet balance</p>
        <STXAmount microSTX={MOCK_BALANCE} size="lg" />
      </div>
      <LiveIndicator />
    </div>
  );
}
