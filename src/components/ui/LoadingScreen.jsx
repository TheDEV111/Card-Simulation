import SpinnerRing from "./SpinnerRing";

export default function LoadingScreen({ message = "Loading…", className = "" }) {
  return (
    <div
      className={`min-h-[300px] flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-label={message}
    >
      <SpinnerRing size={36} strokeWidth={3} color="text-gold" />
      <p className="text-sm text-white/30">{message}</p>
    </div>
  );
}
