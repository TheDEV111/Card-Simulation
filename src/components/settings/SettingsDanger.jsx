import { useState } from "react";
import { usePreferences } from "../../hooks/usePreferences";
import SettingsSection from "./SettingsSection";

export default function SettingsDanger() {
  const { reset } = usePreferences();
  const [confirming, setConfirming] = useState(false);

  const handleReset = () => {
    reset();
    setConfirming(false);
  };

  return (
    <SettingsSection
      title="Danger Zone"
      description="Irreversible actions — proceed carefully."
    >
      <div className="panel p-4 space-y-3 ring-1 ring-loss/20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-white/70">Reset all settings</p>
            <p className="text-xs text-white/30">Restore all preferences to their defaults</p>
          </div>
          {confirming ? (
            <div className="flex gap-2">
              <button
                onClick={() => setConfirming(false)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/8 text-white/50 hover:bg-white/12"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="text-xs px-3 py-1.5 rounded-lg bg-loss/20 text-loss hover:bg-loss/30"
              >
                Confirm reset
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirming(true)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white/8 text-white/50 hover:bg-loss/10 hover:text-loss transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </div>
    </SettingsSection>
  );
}
