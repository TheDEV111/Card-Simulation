import { useBatteryStatus } from "./useBatteryStatus.js";

export function useLowBatteryMode(threshold = 20) {
  const { level, charging, supported } = useBatteryStatus();

  const lowPowerMode = supported && !charging && level !== null && level <= threshold;

  return {
    lowPowerMode,
    shouldReduceAnimations: lowPowerMode,
    shouldReducePolling: lowPowerMode,
    shouldSkipPrefetch: lowPowerMode,
  };
}
