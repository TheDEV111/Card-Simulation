import { useNetworkStatus } from "../../hooks/useNetworkStatus";

export default function OfflineBanner() {
  const { offline } = useNetworkStatus();
  if (!offline) return null;

  return (
    <div
      role="alert"
      className="fixed top-0 left-0 right-0 z-50 bg-loss/90 text-white text-center text-sm py-2 px-4 backdrop-blur-sm"
    >
      You are offline. Some features may be unavailable.
    </div>
  );
}
