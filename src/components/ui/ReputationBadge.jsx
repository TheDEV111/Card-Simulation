const LEVELS = [
  { min: 0, label: "Newcomer", color: "text-gray-600 bg-gray-100" },
  { min: 100, label: "Member", color: "text-blue-700 bg-blue-100" },
  { min: 500, label: "Regular", color: "text-green-700 bg-green-100" },
  { min: 1000, label: "Trusted", color: "text-purple-700 bg-purple-100" },
  { min: 5000, label: "Expert", color: "text-amber-700 bg-amber-100" },
  { min: 10000, label: "Elite", color: "text-red-700 bg-red-100" },
];

function getLevel(score) {
  return [...LEVELS].reverse().find((l) => score >= l.min) ?? LEVELS[0];
}

export function ReputationBadge({ score = 0, showScore = true, className = "" }) {
  const level = getLevel(score);

  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-semibold ${level.color} ${className}`}>
      {level.label}
      {showScore && <span className="opacity-70">· {score.toLocaleString()}</span>}
    </span>
  );
}
