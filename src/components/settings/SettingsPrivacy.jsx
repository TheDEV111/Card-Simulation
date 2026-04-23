import { usePreferences } from "../../hooks/usePreferences";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

export default function SettingsPrivacy() {
  const { preferences, setPreference } = usePreferences();

  return (
    <SettingsSection
      title="Privacy"
      description="Control what data is shared and how your profile appears."
    >
      <SettingsToggle
        label="Show on leaderboard"
        description="Include your address and stats in the public leaderboard"
        value={preferences.showOnLeaderboard ?? true}
        onChange={(v) => setPreference("showOnLeaderboard", v)}
      />
      <SettingsToggle
        label="Public profile"
        description="Allow others to view your profile and game history"
        value={preferences.publicProfile ?? true}
        onChange={(v) => setPreference("publicProfile", v)}
      />
      <SettingsToggle
        label="Share analytics"
        description="Help improve the app by sending anonymous usage data"
        value={preferences.analytics ?? false}
        onChange={(v) => setPreference("analytics", v)}
      />
    </SettingsSection>
  );
}
