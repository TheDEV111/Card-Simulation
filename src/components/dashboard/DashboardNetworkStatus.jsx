import DotIndicator from "../ui/DotIndicator";

export default function DashboardNetworkStatus() {
  return (
    <div className="panel p-4 flex items-center justify-between">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <DotIndicator status="live" pulse />
          <span className="text-xs font-medium text-white/60">Stacks Mainnet</span>
        </div>
        <div className="flex items-center gap-2">
          <DotIndicator status="live" />
          <span className="text-xs text-white/40">Contract verified</span>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xs text-white/25">Block</p>
        <p className="font-mono text-xs text-white/50">140,821</p>
      </div>
    </div>
  );
}
