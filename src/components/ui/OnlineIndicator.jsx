export function OnlineIndicator({ online = true, label, size = "sm", className = "" }) {
  const dot = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  }[size] ?? "w-2 h-2";

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex">
        {online && (
          <span className={`animate-ping absolute inline-flex rounded-full bg-green-400 opacity-60 ${dot}`} />
        )}
        <span
          className={`relative inline-flex rounded-full ${dot} ${
            online ? "bg-green-500" : "bg-gray-300"
          }`}
        />
      </span>
      {label && (
        <span className={`text-xs font-medium ${online ? "text-green-700" : "text-gray-500"}`}>
          {label ?? (online ? "Online" : "Offline")}
        </span>
      )}
    </span>
  );
}
