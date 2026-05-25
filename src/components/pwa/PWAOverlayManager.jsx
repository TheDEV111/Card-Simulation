import { SWProgressBar } from "./SWProgressBar.jsx";
import { OfflineIndicator } from "./OfflineIndicator.jsx";
import { ReconnectingOverlay } from "./ReconnectingOverlay.jsx";
import { PWAToastContainer } from "./PWAToast.jsx";
import { InstallSuccessBanner } from "./InstallSuccessBanner.jsx";
import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function PWAOverlayManager() {
  const { applying } = useSWUpdate();

  return (
    <>
      <SWProgressBar active={applying} />
      <OfflineIndicator position="bottom-right" />
      <ReconnectingOverlay />
      <PWAToastContainer />
      <InstallSuccessBanner />
    </>
  );
}
