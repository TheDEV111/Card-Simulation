const CHIP_COLORS = {
  1:    "bg-white text-gray-800 ring-gray-300",
  5:    "bg-red-500 text-white ring-red-300",
  10:   "bg-blue-500 text-white ring-blue-300",
  25:   "bg-green-500 text-white ring-green-300",
  50:   "bg-orange-500 text-white ring-orange-300",
  100:  "bg-gray-900 text-white ring-gray-700",
  500:  "bg-purple-600 text-white ring-purple-400",
  1000: "bg-yellow-500 text-gray-900 ring-yellow-300",
};

export default function BetChip({ value, onClick, selected, size = "md", className = "" }) {
  const colors = CHIP_COLORS[value] ?? "bg-indigo-500 text-white ring-indigo-300";
  const sizes = { sm: "h-10 w-10 text-xs", md: "h-14 w-14 text-sm", lg: "h-20 w-20 text-base" };

  return (
    <button
      type="button"
      onClick={() => onClick?.(value)}
      className={`relative flex shrink-0 items-center justify-center rounded-full font-bold ring-4 ring-offset-2 transition-all ${colors} ${sizes[size] ?? sizes.md} ${selected ? "scale-110 shadow-lg" : "hover:scale-105"} ${className}`}
    >
      <span className="absolute inset-0 rounded-full border-4 border-white/20" />
      {value >= 1000 ? `${value / 1000}K` : value}
    </button>
  );
}
