export function LoadingShell({ message = "Loading…" }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: "#0f0f14" }}>
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-12 h-12 rounded-full border-2 animate-spin"
          style={{ borderColor: "rgba(212,168,75,0.15)", borderTopColor: "#d4a84b" }}
        />
        <p className="text-xs tracking-widest uppercase"
          style={{ color: "rgba(212,168,75,0.5)", fontFamily: "Barlow, sans-serif", letterSpacing: "0.2em" }}>
          {message}
        </p>
      </div>
    </div>
  );
}
