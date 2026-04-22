export default function MiniWinChart({ games = [] }) {
  const last20 = games.slice(0, 20).reverse();
  if (!last20.length) return null;

  return (
    <div className="flex items-end gap-0.5 h-8">
      {last20.map((g, i) => (
        <div
          key={i}
          title={g.outcome}
          className={[
            "flex-1 rounded-sm transition-all duration-150",
            g.outcome === "win" ? "bg-win" : "bg-loss/60",
          ].join(" ")}
          style={{ height: g.outcome === "win" ? "100%" : "60%" }}
        />
      ))}
    </div>
  );
}
