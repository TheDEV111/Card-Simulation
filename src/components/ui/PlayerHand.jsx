const SUIT_COLOR = { "♠": "text-gray-900 dark:text-white", "♣": "text-gray-900 dark:text-white", "♥": "text-red-500", "♦": "text-red-500" };

function MiniCard({ rank, suit, faceDown }) {
  if (faceDown) {
    return (
      <div className="flex h-20 w-14 items-center justify-center rounded-xl bg-indigo-600 shadow-md ring-2 ring-white/20">
        <div className="h-12 w-10 rounded-lg border-2 border-white/20" />
      </div>
    );
  }
  return (
    <div className={`flex h-20 w-14 flex-col justify-between rounded-xl bg-white p-1.5 shadow-md ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700 ${SUIT_COLOR[suit]}`}>
      <div className="text-sm font-bold leading-none">{rank}</div>
      <div className="text-center text-2xl leading-none">{suit}</div>
    </div>
  );
}

export default function PlayerHand({ cards = [], label, className = "" }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {label && <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>}
      <div className="flex items-center -space-x-4">
        {cards.map((card, i) => (
          <div key={i} style={{ zIndex: i }} className="relative">
            <MiniCard {...card} />
          </div>
        ))}
      </div>
    </div>
  );
}
