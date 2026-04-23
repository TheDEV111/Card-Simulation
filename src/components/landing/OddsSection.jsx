import { houseEdge, expectedValue } from "../../utils/probability";
import StatRow from "../ui/StatRow";
import PercentBar from "../ui/PercentBar";

export default function OddsSection({ className = "" }) {
  const winProb  = 1 / 3;
  const payout   = 3;
  const ev       = expectedValue(winProb, payout - 1, -(1));
  const edge     = houseEdge(winProb, payout);

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>Fair odds</h2>
          <p className="text-sm text-white/40">The math is public. No surprises.</p>
        </div>
        <div className="panel p-6 space-y-4">
          <div className="divide-y divide-white/5">
            <StatRow label="Win probability"    value="33.3%" accent />
            <StatRow label="Payout on win"      value="3× stake" />
            <StatRow label="House edge"         value={`${(edge * 100).toFixed(1)}%`} />
            <StatRow label="Expected value"     value={`${(ev * 100).toFixed(1)}¢ per $1`} />
          </div>
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-white/40">
              <span>Win chance</span>
              <span>33%</span>
            </div>
            <PercentBar value={33} max={100} color="bg-win/60" />
          </div>
        </div>
      </div>
    </section>
  );
}
