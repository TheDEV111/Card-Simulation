import { useVolatility } from "../../hooks/useVolatility";
import StatRow from "../ui/StatRow";
import STXAmount from "../ui/STXAmount";

export default function ProfileVolatility({ className = "" }) {
  const { mean, stdDev, sharpe } = useVolatility(30);

  const isPositive = mean >= 0;

  return (
    <div className={`panel p-5 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Risk Profile</h3>
      <div className="divide-y divide-white/5">
        <StatRow
          label="Avg PnL / game"
          value={
            <span className={isPositive ? "text-win" : "text-loss"}>
              {isPositive ? "+" : "−"}<STXAmount ustx={Math.abs(mean)} />
            </span>
          }
        />
        <StatRow label="Volatility (σ)" value={<STXAmount ustx={stdDev} />} />
        <StatRow label="Sharpe ratio" value={sharpe} accent={Number(sharpe) > 0} />
      </div>
    </div>
  );
}
