import { useState, useEffect } from "react";

export function useBattery() {
  const [state, setState] = useState({
    supported: false,
    loading: true,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });

  useEffect(() => {
    if (!navigator.getBattery) {
      setState((s) => ({ ...s, supported: false, loading: false }));
      return;
    }

    let battery = null;

    const update = (b) => {
      setState({
        supported: true,
        loading: false,
        level: b.level,
        charging: b.charging,
        chargingTime: b.chargingTime,
        dischargingTime: b.dischargingTime,
      });
    };

    navigator.getBattery().then((b) => {
      battery = b;
      update(b);
      b.addEventListener("levelchange", () => update(b));
      b.addEventListener("chargingchange", () => update(b));
      b.addEventListener("chargingtimechange", () => update(b));
      b.addEventListener("dischargingtimechange", () => update(b));
    });

    return () => {
      if (!battery) return;
      battery.removeEventListener("levelchange", () => update(battery));
      battery.removeEventListener("chargingchange", () => update(battery));
      battery.removeEventListener("chargingtimechange", () => update(battery));
      battery.removeEventListener("dischargingtimechange", () => update(battery));
    };
  }, []);

  return state;
}
