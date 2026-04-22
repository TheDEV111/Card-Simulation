import GlobalStatsBar from "../ui/GlobalStatsBar";

export default function DashboardGlobalStats() {
  return (
    <div className="space-y-2">
      <p className="label-caps">Global stats</p>
      <GlobalStatsBar />
    </div>
  );
}
