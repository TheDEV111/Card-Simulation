import { usePreferences } from "../../hooks/usePreferences";
import SettingsSection from "./SettingsSection";
import SettingsToggle from "./SettingsToggle";
import SettingsSelect from "./SettingsSelect";

const FONT_OPTIONS = [
  { value: "cinzel",  label: "Cinzel (Default)" },
  { value: "system",  label: "System UI" },
];

const DENSITY_OPTIONS = [
  { value: "comfortable", label: "Comfortable" },
  { value: "compact",     label: "Compact" },
];

export default function SettingsAppearance() {
  const { preferences, setPreference } = usePreferences();

  return (
    <SettingsSection
      title="Appearance"
      description="Customize how the interface looks and feels."
    >
      <SettingsToggle
        label="Dark mode"
        description="Use a dark color scheme (recommended)"
        value={preferences.darkMode ?? true}
        onChange={(v) => setPreference("darkMode", v)}
      />
      <SettingsToggle
        label="Reduced motion"
        description="Limit animations and transitions"
        value={preferences.reducedMotion ?? false}
        onChange={(v) => setPreference("reducedMotion", v)}
      />
      <SettingsSelect
        label="Font style"
        value={preferences.font ?? "cinzel"}
        onChange={(v) => setPreference("font", v)}
        options={FONT_OPTIONS}
      />
      <SettingsSelect
        label="Layout density"
        value={preferences.density ?? "comfortable"}
        onChange={(v) => setPreference("density", v)}
        options={DENSITY_OPTIONS}
      />
    </SettingsSection>
  );
}
