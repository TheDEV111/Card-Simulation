const CARDS = [
  { id: 1, suit: "♠", label: "Spades" },
  { id: 2, suit: "♥", label: "Hearts" },
  { id: 3, suit: "♦", label: "Diamonds" },
];

export default function CardSelector({ selected, onChange, disabled }) {
  return (
    <div>
      <p className="text-xs font-medium text-white/40 uppercase tracking-widest mb-3">
        Pick a card
      </p>
      <div className="grid grid-cols-3 gap-3">
        {CARDS.map((card) => {
          const isSelected = selected === card.id;
          const isRed = card.id !== 1;
          return (
            <button
              key={card.id}
              disabled={disabled}
              onClick={() => onChange(card.id)}
              className={[
                "flex flex-col items-center justify-center gap-1.5 py-6 rounded-2xl",
                "transition-all duration-150 cursor-pointer select-none",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                isSelected
                  ? "shadow-card-selected bg-surface-overlay"
                  : "shadow-card bg-surface-raised hover:shadow-card-hover hover:-translate-y-0.5",
              ].join(" ")}
            >
              <span
                className={[
                  "text-4xl leading-none",
                  isRed ? "text-rose-400" : "text-white",
                  isSelected ? "scale-110" : "",
                  "transition-transform duration-150",
                ].join(" ")}
              >
                {card.suit}
              </span>
              <span className="text-xs font-medium text-white/40">
                {card.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
