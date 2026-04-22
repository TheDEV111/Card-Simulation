import { useState } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import CardPicker from "../ui/CardPicker";
import { formatSTX } from "../../utils/format";

const PRESETS = [5_000, 10_000, 50_000];

export default function DashboardQuickPlay() {
  const [card, setCard] = useState(null);
  const [stake, setStake] = useState(10_000);

  const SUIT_LABELS = ["Spades ♠", "Hearts ♥", "Diamonds ♦"];

  return (
    <div className="panel p-5 space-y-4">
      <p className="label-caps">Quick play</p>
      <CardPicker selected={card} onChange={setCard} />
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setStake(p)}
            className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-150 ${
              stake === p
                ? "bg-gold text-surface"
                : "bg-surface-overlay border border-white/10 text-white/50 hover:border-gold/30"
            }`}
          >
            {formatSTX(p)}
          </button>
        ))}
      </div>
      <Link
        to={ROUTES.GAME}
        className="block text-center py-3 rounded-xl bg-gold text-surface font-bold text-sm hover:bg-gold-light transition-colors duration-150"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        {card ? `Play ${formatSTX(stake)} on ${SUIT_LABELS[card - 1]}` : "Select a card →"}
      </Link>
    </div>
  );
}
