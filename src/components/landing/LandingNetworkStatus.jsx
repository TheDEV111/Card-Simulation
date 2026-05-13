import LiveIndicator from "../ui/LiveIndicator";

export default function LandingNetworkStatus() {
  return (
    <div className="flex items-center gap-2">
      <LiveIndicator />
      <span className="text-xs text-white/40">Stacks Mainnet</span>
    </div>
  );
}
