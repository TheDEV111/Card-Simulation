import { useState } from "react";

const TABS = [
  { id: "appearance",    label: "Appearance" },
  { id: "gameplay",      label: "Gameplay" },
  { id: "notifications", label: "Notifications" },
  { id: "privacy",       label: "Privacy" },
  { id: "wallet",        label: "Wallet" },
];

export function useSettingsNav() {
  const [active, setActive] = useState(TABS[0].id);
  return { tabs: TABS, active, setActive };
}
