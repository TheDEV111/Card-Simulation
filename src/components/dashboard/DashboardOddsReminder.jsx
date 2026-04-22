import { WIN_ODDS, WIN_MULTIPLIER } from "../../utils/constants";
import OddsDisplay from "../ui/OddsDisplay";

export default function DashboardOddsReminder() {
  return (
    <div className="panel p-5 space-y-3">
      <p className="label-caps">Game odds</p>
      <OddsDisplay winOdds={WIN_ODDS} multiplier={WIN_MULTIPLIER} />
      <p className="text-xs text-white/30 leading-relaxed">
        One of three suits wins each round. You win <strong className="text-gold">{WIN_MULTIPLIER}×</strong> your stake on a match.
      </p>
    </div>
  );
}
