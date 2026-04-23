import { useState } from "react";
import { useRewardPoints } from "../../hooks/useRewardPoints";

const ITEMS = [
  { id: "avatar_gold",    name: "Gold Avatar Border", cost: 500,  icon: "🏅", desc: "Show off a gold ring on your avatar" },
  { id: "badge_diamond",  name: "Diamond Badge",      cost: 1000, icon: "💎", desc: "Exclusive diamond badge on your profile" },
  { id: "theme_crimson",  name: "Crimson Theme",      cost: 750,  icon: "🎨", desc: "Unlock the crimson color scheme" },
  { id: "title_legend",   name: "Legend Title",       cost: 2000, icon: "👑", desc: "Display "Legend" next to your name" },
];

export default function RewardsShop({ className = "" }) {
  const { points } = useRewardPoints();
  const [owned, setOwned] = useState(new Set());

  const buy = (item) => {
    if (points < item.cost || owned.has(item.id)) return;
    setOwned((s) => new Set([...s, item.id]));
  };

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Reward Shop</h3>
        <span className="text-xs text-gold font-semibold">{points.toLocaleString()} pts</span>
      </div>
      <div className="space-y-2">
        {ITEMS.map((item) => {
          const canAfford = points >= item.cost;
          const isOwned   = owned.has(item.id);
          return (
            <div key={item.id} className={`flex items-center gap-3 p-3 rounded-lg ${isOwned ? "bg-white/3" : "bg-white/5"}`}>
              <span className={`text-xl ${!canAfford && !isOwned ? "grayscale opacity-40" : ""}`}>{item.icon}</span>
              <div className="flex-1 min-w-0">
                <p className={`text-xs font-semibold ${isOwned ? "text-white/40" : "text-white/80"}`}>{item.name}</p>
                <p className="text-[10px] text-white/30">{item.desc}</p>
              </div>
              <button
                onClick={() => buy(item)}
                disabled={!canAfford || isOwned}
                className={`flex-shrink-0 text-xs px-3 py-1 rounded-full transition-colors ${
                  isOwned
                    ? "bg-white/5 text-white/25 cursor-default"
                    : canAfford
                    ? "bg-gold/20 text-gold hover:bg-gold/30"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                {isOwned ? "Owned" : `${item.cost.toLocaleString()} pts`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
