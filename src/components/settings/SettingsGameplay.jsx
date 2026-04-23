import { usePreferences } from "../../hooks/usePreferences";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";
import SettingsSelect from "./SettingsSelect";

const DEFAULT_STAKE_OPTIONS = [
  { value: "1000000",    label: "1 STX" },
  { value: "5000000",    label: "5 STX" },
  { value: "10000000",   label: "10 STX" },
  { value: "50000000",   label: "50 STX" },
  { value: "100000000",  label: "100 STX" },
];

const CONFIRM_OPTIONS = [
  { value: "always",     label: "Always" },
  { value: "large",      label: "Only for large stakes (>10 STX)" },
  { value: "never",      label: "Never" },
];

export default function SettingsGameplay() {
  const { preferences, setPreference } = usePreferences();

  return (
    <SettingsSection
      title="Gameplay"
      description="Defaults and confirmations for game sessions."
    >
      <SettingsSelect
        label="Default stake"
        description="Pre-filled amount when opening the game"
        value={preferences.defaultStake ?? "10000000"}
        onChange={(v) => setPreference("defaultStake", v)}
        options={DEFAULT_STAKE_OPTIONS}
      />
      <SettingsSelect
        label="Play confirmation"
        description="When to ask before submitting a game"
        value={preferences.confirmPlay ?? "large"}
        onChange={(v) => setPreference("confirmPlay", v)}
        options={CONFIRM_OPTIONS}
      />
      <SettingsToggle
        label="Show potential payout"
        description="Display max payout before each play"
        value={preferences.showPayout ?? true}
        onChange={(v) => setPreference("showPayout", v)}
      />
      <SettingsToggle
        label="Auto-select last card"
        description="Pre-fill your previous card choice"
        value={preferences.autoSelectCard ?? false}
        onChange={(v) => setPreference("autoSelectCard", v)}
      />
      <SettingsToggle
        label="Keyboard shortcuts"
        description="Use 1/2/3 to pick a suit, Enter to play"
        value={preferences.keyboardShortcuts ?? true}
        onChange={(v) => setPreference("keyboardShortcuts", v)}
      />
    </SettingsSection>
  );
}
