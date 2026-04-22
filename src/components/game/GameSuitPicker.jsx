import SuitIcon from "../ui/SuitIcon";
import CardShine from "../ui/CardShine";

const SUITS = [
  { id: 1, name: "Spades",   description: "The classic suit" },
  { id: 2, name: "Diamonds", description: "Gold and glory" },
  { id: 3, name: "Clubs",    description: "Fortune favors" },
];

export default function GameSuitPicker({ selected, onChange, className = "" }) {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`} role="radiogroup" aria-label="Pick your suit">
      {SUITS.map((suit) => {
        const active = selected === suit.id;
        return (
          <CardShine key={suit.id}>
            <button
              role="radio"
              aria-checked={active}
              onClick={() => onChange(suit.id)}
              className={`w-full flex flex-col items-center gap-2 py-5 px-3 rounded-2xl border-2 transition-all duration-200 ${
                active
                  ? "border-gold/60 bg-gold/8 shadow-[0_0_20px_rgba(212,175,55,0.12)]"
                  : "border-white/8 bg-white/3 hover:border-white/15 hover:bg-white/5"
              }`}
            >
              <SuitIcon suit={suit.id} size="xl" />
              <div className="text-center">
                <p className={`text-xs font-semibold ${active ? "text-gold" : "text-white/50"}`}>
                  {suit.name}
                </p>
                <p className="text-[10px] text-white/20 mt-0.5">{suit.description}</p>
              </div>
            </button>
          </CardShine>
        );
      })}
    </div>
  );
}
