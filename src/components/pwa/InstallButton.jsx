import { usePWAInstall } from "../../hooks/usePWAInstall.js";

export function InstallButton({ className = "", label = "Install App", size = "md" }) {
  const { canInstall, installed, install } = usePWAInstall();

  if (installed) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 text-xs ${className}`}
        style={{ color: "rgba(212,168,75,0.7)", fontFamily: "Barlow, sans-serif" }}
      >
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        Installed
      </span>
    );
  }

  if (!canInstall) return null;

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      onClick={install}
      className={`inline-flex items-center gap-2 rounded-lg font-semibold transition-all duration-150 active:scale-95 hover:brightness-110 ${sizes[size] ?? sizes.md} ${className}`}
      style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      {label}
    </button>
  );
}
