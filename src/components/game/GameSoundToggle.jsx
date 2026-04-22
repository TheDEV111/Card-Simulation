import { usePreferences } from "../../context/PreferencesContext";

export default function GameSoundToggle({ className = "" }) {
  const { prefs, set } = usePreferences();

  return (
    <button
      onClick={() => set("soundEnabled", !prefs.soundEnabled)}
      aria-pressed={prefs.soundEnabled}
      aria-label={prefs.soundEnabled ? "Mute sounds" : "Unmute sounds"}
      className={`text-xs text-white/30 hover:text-white/50 transition-colors flex items-center gap-1.5 ${className}`}
    >
      <span aria-hidden="true">{prefs.soundEnabled ? "🔊" : "🔇"}</span>
      <span>{prefs.soundEnabled ? "Sound on" : "Muted"}</span>
    </button>
  );
}
