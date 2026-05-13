import { useState } from "react";

export function VoteButton({ initialUpvotes = 0, initialDownvotes = 0, onVote }) {
  const [vote, setVote] = useState(null);
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);

  const cast = (dir) => {
    if (vote === dir) {
      setVote(null);
      dir === "up" ? setUpvotes((v) => v - 1) : setDownvotes((v) => v - 1);
      onVote?.(null);
    } else {
      if (vote === "up") setUpvotes((v) => v - 1);
      if (vote === "down") setDownvotes((v) => v - 1);
      setVote(dir);
      dir === "up" ? setUpvotes((v) => v + 1) : setDownvotes((v) => v + 1);
      onVote?.(dir);
    }
  };

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => cast("up")}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-colors ${
          vote === "up" ? "bg-green-100 text-green-700" : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
        {upvotes}
      </button>
      <button
        onClick={() => cast("down")}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-medium transition-colors ${
          vote === "down" ? "bg-red-100 text-red-700" : "text-gray-500 hover:bg-gray-100"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
        {downvotes}
      </button>
    </div>
  );
}
