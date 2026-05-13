export function PollBar({ options = [], totalVotes = 0, onVote }) {
  return (
    <div className="space-y-3">
      {options.map((opt) => {
        const pct = totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
        return (
          <button
            key={opt.id}
            onClick={() => onVote?.(opt.id)}
            className="w-full text-left group relative"
          >
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{opt.label}</span>
              <span className="text-gray-500">{pct}%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
            <span className="text-xs text-gray-400 mt-0.5 block">{opt.votes} votes</span>
          </button>
        );
      })}
      <p className="text-xs text-gray-400">{totalVotes} total votes</p>
    </div>
  );
}
