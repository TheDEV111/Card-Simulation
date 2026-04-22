import CardSymbol from "./CardSymbol";
import { cn } from "../../utils/cn";

const CARDS = [
  { id: 1, suit: "♠", name: "Spade" },
  { id: 2, suit: "♥", name: "Heart" },
  { id: 3, suit: "♦", name: "Diamond" },
];

export default function CardPicker({ selected, onChange, disabled }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {CARDS.map((card) => {
        const active = selected === card.id;
        return (
          <button
            key={card.id}
            onClick={() => !disabled && onChange(card.id)}
            disabled={disabled}
            className={cn(
              "flex flex-col items-center justify-center py-5 rounded-2xl border transition-all duration-150",
              active
                ? "bg-gold/10 border-gold shadow-card-selected scale-[1.03]"
                : "bg-surface-overlay border-white/8 hover:border-white/20",
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            <CardSymbol card={card.id} size="lg" />
            <span className="text-xs text-white/40 mt-2">{card.name}</span>
          </button>
        );
      })}
    </div>
  );
}
