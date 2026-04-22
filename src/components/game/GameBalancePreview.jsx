import { useWalletBalance } from "../../hooks/useWalletBalance";
import STXAmount from "../ui/STXAmount";
import SpinnerRing from "../ui/SpinnerRing";

export default function GameBalancePreview({ stake, className = "" }) {
  const { balance, loading } = useWalletBalance();

  if (loading) return <SpinnerRing size={16} className="text-gold/50" />;
  if (!balance) return null;

  const afterLoss = balance - stake;
  const afterWin  = balance - stake + stake * 3;

  return (
    <div className={`text-xs text-white/25 space-y-0.5 ${className}`}>
      <p>Balance: <span className="text-white/50"><STXAmount ustx={balance} /></span></p>
      <p>After loss: <span className="text-loss/70"><STXAmount ustx={afterLoss} /></span></p>
      <p>After win: <span className="text-win/70"><STXAmount ustx={afterWin} /></span></p>
    </div>
  );
}
