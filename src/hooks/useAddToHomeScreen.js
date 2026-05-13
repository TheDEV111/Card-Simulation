import { usePWAInstall } from "./usePWAInstall.js";
import { usePWADisplay } from "./usePWADisplay.js";

export function useAddToHomeScreen() {
  const install = usePWAInstall();
  const display = usePWADisplay();

  const shouldPrompt = !display.isStandalone && (install.showBanner || install.showIOSGuide);
  const promptType = install.isIOS ? "ios" : install.canInstall ? "native" : null;

  return {
    ...install,
    ...display,
    shouldPrompt,
    promptType,
    isReady: install.canInstall || install.isIOS,
  };
}
