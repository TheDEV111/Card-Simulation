import { useSettings } from "../hooks/useSettings";
import PageHeader from "../components/ui/PageHeader";
import SettingsRow from "../components/ui/SettingsRow";
import Toggle from "../components/ui/Toggle";
import ContractInfo from "../components/ui/ContractInfo";
import { MIN_STAKE_USTX, MAX_STAKE_USTX } from "../utils/constants";
import { formatSTX } from "../utils/format";

export default function SettingsPage() {
  const { settings, update } = useSettings();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-8">
      <PageHeader title="Settings" subtitle="Configure your game experience." />

      {/* Gameplay */}
      <section className="space-y-1">
        <p className="label-caps px-1 mb-3">Gameplay</p>
        <div className="panel divide-y divide-white/5">
          <SettingsRow
            label="Confirm before play"
            description="Show a confirmation modal before each game."
          >
            <Toggle
              checked={settings.confirmBeforePlay}
              onChange={(v) => update("confirmBeforePlay", v)}
            />
          </SettingsRow>
          <SettingsRow
            label="Sound effects"
            description="Play audio on win and loss outcomes."
          >
            <Toggle
              checked={settings.soundEnabled}
              onChange={(v) => update("soundEnabled", v)}
            />
          </SettingsRow>
          <SettingsRow
            label="Show transaction links"
            description="Display Stacks Explorer links on game results."
          >
            <Toggle
              checked={settings.showTxLinks}
              onChange={(v) => update("showTxLinks", v)}
            />
          </SettingsRow>
        </div>
      </section>

      {/* Default stake */}
      <section className="space-y-1">
        <p className="label-caps px-1 mb-3">Defaults</p>
        <div className="panel p-5 space-y-4">
          <SettingsRow label="Default stake" description={`Range: ${formatSTX(MIN_STAKE_USTX)} – ${formatSTX(MAX_STAKE_USTX)}`}>
            <span className="text-sm text-gold font-semibold">{formatSTX(settings.defaultStake)}</span>
          </SettingsRow>
          <input
            type="range"
            min={MIN_STAKE_USTX}
            max={MAX_STAKE_USTX}
            step={1_000}
            value={settings.defaultStake}
            onChange={(e) => update("defaultStake", Number(e.target.value))}
            className="w-full accent-gold"
          />
        </div>
      </section>

      {/* Notifications */}
      <section className="space-y-1">
        <p className="label-caps px-1 mb-3">Notifications</p>
        <div className="panel divide-y divide-white/5">
          <SettingsRow
            label="Email notifications"
            description="Get notified about game outcomes and updates."
          >
            <Toggle
              checked={settings.notificationsEmail}
              onChange={(v) => update("notificationsEmail", v)}
            />
          </SettingsRow>
        </div>
      </section>

      {/* Contract */}
      <section className="space-y-3">
        <p className="label-caps px-1">Contract info</p>
        <ContractInfo />
      </section>

      {/* Version */}
      <p className="text-xs text-white/20 text-center">v1.0.0 · Stacks Mainnet</p>
    </div>
  );
}
