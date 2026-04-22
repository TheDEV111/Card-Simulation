import { cn } from "../../utils/cn";

export default function RankBadge({ rank }) {
  if (!rank) return null;
  const tier =
    rank === 1 ? { label: "1st", color: "text-gold border-gold/40 bg-gold/10" } :
    rank === 2 ? { label: "2nd", color: "text-white/70 border-white/20 bg-white/5" } :
    rank === 3 ? { label: "3rd", color: "text-win border-win/40 bg-win/10" } :
    rank <= 10  ? { label: `Top 10`, color: "text-white/50 border-white/10 bg-white/5" } :
                  { label: `#${rank}`, color: "text-white/30 border-white/10 bg-white/5" };

  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border", tier.color)}>
      🏆 {tier.label}
    </span>
  );
}
