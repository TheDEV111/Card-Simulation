import { useState, useEffect } from "react";
import { getBattery, getBatteryLevel, getBatteryStatus, isBatterySupported } from "../pwa/battery.js";

export function useBatteryStatus() {
  const [supported] = useState(isBatterySupported);
  const [level, setLevel] = useState(null);
  const [charging, setCharging] = useState(null);
  const [chargingTime, setChargingTime] = useState(null);
  const [dischargingTime, setDischargingTime] = useState(null);

  useEffect(() => {
    if (!supported) return;
    let battery = null;

    const update = (b) => {
      setLevel(getBatteryLevel(b));
      setCharging(b.charging);
      setChargingTime(b.chargingTime);
      setDischargingTime(b.dischargingTime);
    };

    getBattery().then((b) => {
      if (!b) return;
      battery = b;
      update(b);
      b.addEventListener("levelchange", () => update(b));
      b.addEventListener("chargingchange", () => update(b));
      b.addEventListener("chargingtimechange", () => update(b));
      b.addEventListener("dischargingtimechange", () => update(b));
    });

    return () => {
      if (!battery) return;
      ["levelchange", "chargingchange", "chargingtimechange", "dischargingtimechange"]
        .forEach((e) => battery.removeEventListener(e, () => {}));
    };
  }, [supported]);

  const status = getBatteryStatus(level, charging);
  const isLow = status === "low" || status === "critical";
  const isCritical = status === "critical";

  return { supported, level, charging, chargingTime, dischargingTime, status, isLow, isCritical };
}
