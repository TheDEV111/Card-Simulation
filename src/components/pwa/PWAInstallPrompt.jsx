import { usePWAInstall } from "../../hooks/usePWAInstall.js";
import { InstallBanner } from "./InstallBanner.jsx";
import { IOSInstallGuide } from "./IOSInstallGuide.jsx";

export function PWAInstallPrompt() {
  const { showBanner, showIOSGuide, dismiss } = usePWAInstall();

  if (showIOSGuide) return <IOSInstallGuide onDismiss={dismiss} />;
  if (showBanner) return <InstallBanner />;
  return null;
}
