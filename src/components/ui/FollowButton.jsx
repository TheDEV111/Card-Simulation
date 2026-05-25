import { useState } from "react";

export function FollowButton({ initialFollowing = false, onToggle, size = "sm" }) {
  const [following, setFollowing] = useState(initialFollowing);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    const next = !following;
    setFollowing(next);
    onToggle?.(next);
  };

  const sizes = {
    xs: "px-2.5 py-1 text-xs",
    sm: "px-4 py-1.5 text-sm",
    md: "px-5 py-2 text-base",
  };

  const label = following ? (hovered ? "Unfollow" : "Following") : "Follow";

  return (
    <button
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`rounded-full font-semibold transition-all ${sizes[size] ?? sizes.sm} ${
        following
          ? hovered
            ? "bg-red-50 text-red-600 ring-1 ring-red-200"
            : "bg-gray-100 text-gray-700 ring-1 ring-gray-200"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      }`}
    >
      {label}
    </button>
  );
}
