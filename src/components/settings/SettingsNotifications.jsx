import { usePreferences } from "../../hooks/usePreferences";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";

export default function SettingsNotifications() {
  const { preferences, setPreference } = usePreferences();

  return (
    <SettingsSection
      title="Notifications"
      description="Control what alerts and sounds are active during gameplay."
    >
      <SettingsToggle
        label="Sound effects"
        description="Play audio feedback on win, loss, and card draw"
        value={preferences.soundEnabled ?? true}
        onChange={(v) => setPreference("soundEnabled", v)}
      />
      <SettingsToggle
        label="Win notifications"
        description="Show a popup banner when you win"
        value={preferences.winNotifications ?? true}
        onChange={(v) => setPreference("winNotifications", v)}
      />
      <SettingsToggle
        label="Streak alerts"
        description="Notify on win or loss streaks of 3 or more"
        value={preferences.streakAlerts ?? true}
        onChange={(v) => setPreference("streakAlerts", v)}
      />
      <SettingsToggle
        label="Confetti on win"
        description="Animate confetti particles after a win"
        value={preferences.confetti ?? true}
        onChange={(v) => setPreference("confetti", v)}
      />
    </SettingsSection>
  );
}
