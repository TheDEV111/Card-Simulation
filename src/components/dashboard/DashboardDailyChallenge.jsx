import DailyChallenge from "../ui/DailyChallenge";

export default function DashboardDailyChallenge() {
  return (
    <div className="space-y-3">
      <p className="label-caps">Today's challenge</p>
      <DailyChallenge />
    </div>
  );
}
