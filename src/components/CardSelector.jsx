const CARDS = [
  { id: 1, suit: "♠", label: "Spades",   color: "text-white" },
  { id: 2, suit: "♥", label: "Hearts",   color: "text-rose-400" },
  { id: 3, suit: "♦", label: "Diamonds", color: "text-gold" },
];

function CornerIndex({ suit, color, flip }) {
  return (
    <span
      className={`absolute text-[10px] font-bold leading-none ${color} ${
        flip ? "bottom-2 right-2.5 rotate-180" : "top-2 left-2.5"
      }`}
    >
      {suit}
    </span>
  );
}

export default function CardSelector({ selected, onChange, disabled }) {
  return (
    <div>
      <p className="label-caps mb-3">Pick a card</p>
      <div className="grid grid-cols-3 gap-3">
        {CARDS.map((card) => {
          const isSelected = selected === card.id;
          return (
            <button
              key={card.id}
              disabled={disabled}
              onClick={() => onChange(card.id)}
              className={[
                "playing-card py-8",
                isSelected ? "selected" : "",
                "disabled:opacity-35 disabled:cursor-not-allowed",
              ].join(" ")}
              aria-pressed={isSelected}
              aria-label={`${card.label} ${isSelected ? "(selected)" : ""}`}
            >
              <CornerIndex suit={card.suit} color={card.color} flip={false} />

              <span
                className={[
                  "text-4xl leading-none transition-transform duration-200",
                  card.color,
                  isSelected ? "scale-110" : "scale-100",
                ].join(" ")}
              >
                {card.suit}
              </span>

              <CornerIndex suit={card.suit} color={card.color} flip />

              <span className="mt-2 text-2xs font-medium text-white/30 tracking-wide uppercase">
                {card.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
