import { PWAStatusPanel } from "./PWAStatusPanel.jsx";
import { StorageQuotaBar } from "./StorageQuotaBar.jsx";
import { CacheClearing } from "./CacheClearing.jsx";
import { BatteryStatusCard } from "./BatteryStatusCard.jsx";
import { AccessibilityPrefsPanel } from "./AccessibilityPrefsPanel.jsx";
import { PWACapabilitiesPanel } from "./PWACapabilitiesPanel.jsx";
import { ConnectionHistoryPanel } from "./ConnectionHistoryPanel.jsx";
import { UpdateCheckButton } from "./UpdateCheckButton.jsx";
import { PWAInfoCard } from "./PWAInfoCard.jsx";

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: 10,
        color: "rgba(212,168,75,0.6)",
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        margin: "0 0 10px",
      }}>{title}</p>
      {children}
    </div>
  );
}

export function PWADashboard() {
  return (
    <div style={{
      maxWidth: 480,
      margin: "0 auto",
      padding: "24px 16px",
      fontFamily: "Barlow, sans-serif",
    }}>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: 20,
        fontWeight: 700,
        color: "#d4a84b",
        margin: "0 0 24px",
      }}>
        App Dashboard
      </p>

      <Section title="Status">
        <PWAInfoCard />
        <div style={{ marginTop: 12 }}>
          <UpdateCheckButton />
        </div>
      </Section>

      <Section title="Health">
        <PWAStatusPanel />
      </Section>

      <Section title="Storage">
        <StorageQuotaBar />
        <div style={{ marginTop: 16 }}>
          <CacheClearing />
        </div>
      </Section>

      <Section title="Device">
        <BatteryStatusCard />
      </Section>

      <Section title="Network">
        <ConnectionHistoryPanel />
      </Section>

      <Section title="Capabilities">
        <PWACapabilitiesPanel />
      </Section>

      <Section title="System">
        <AccessibilityPrefsPanel />
      </Section>
    </div>
  );
}
