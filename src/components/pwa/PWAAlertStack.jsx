import { LowBatteryWarning } from "./LowBatteryWarning.jsx";
import { StorageCriticalAlert } from "./StorageCriticalAlert.jsx";
import { SlowNetworkWarning } from "./SlowNetworkWarning.jsx";
import { DataSaverBadge } from "./DataSaverBadge.jsx";

export function PWAAlertStack({ className = "" }) {
  return (
    <div className={className} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <LowBatteryWarning />
      <StorageCriticalAlert />
      <SlowNetworkWarning />
      <DataSaverBadge />
    </div>
  );
}
