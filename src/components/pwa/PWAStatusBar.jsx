import { ConnectionDot } from "./ConnectionDot.jsx";
import { WakeLockBadge } from "./WakeLockBadge.jsx";
import { OfflineReadyBadge } from "./OfflineReadyBadge.jsx";
import { NetworkSpeedBadge } from "./NetworkSpeedBadge.jsx";
import { BatteryIndicator } from "./BatteryIndicator.jsx";

export function PWAStatusBar({ className = "" }) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        flexWrap: "wrap",
      }}
    >
      <ConnectionDot />
      <OfflineReadyBadge />
      <NetworkSpeedBadge />
      <WakeLockBadge />
      <BatteryIndicator showLabel={false} />
    </div>
  );
}
