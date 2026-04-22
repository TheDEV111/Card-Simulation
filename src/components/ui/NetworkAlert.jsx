import { useNetworkStatus } from "../../hooks/useNetworkStatus";

export default function NetworkAlert() {
  const { offline } = useNetworkStatus();

  if (!offline) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed inset-x-4 bottom-24 z-50 md:bottom-6 md:right-6 md:left-auto md:w-80"
    >
      <div className="flex items-start gap-3 bg-loss/90 text-white rounded-xl px-4 py-3 shadow-xl backdrop-blur-sm text-sm">
        <span aria-hidden="true" className="text-base">⚠</span>
        <div>
          <p className="font-semibold">No connection</p>
          <p className="text-white/70 text-xs mt-0.5">Some features are unavailable offline.</p>
        </div>
      </div>
    </div>
  );
}
