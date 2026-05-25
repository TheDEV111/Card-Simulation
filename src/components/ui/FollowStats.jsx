function StatPair({ label, value, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center hover:opacity-75 transition-opacity disabled:pointer-events-none"
      disabled={!onClick}
    >
      <span className="text-lg font-bold tabular-nums">{value?.toLocaleString() ?? "—"}</span>
      <span className="text-xs text-gray-500">{label}</span>
    </button>
  );
}

export function FollowStats({
  followers = 0,
  following = 0,
  posts,
  onFollowersClick,
  onFollowingClick,
  onPostsClick,
}) {
  return (
    <div className="flex items-center gap-6">
      {posts !== undefined && (
        <StatPair label="Posts" value={posts} onClick={onPostsClick} />
      )}
      <StatPair label="Followers" value={followers} onClick={onFollowersClick} />
      <StatPair label="Following" value={following} onClick={onFollowingClick} />
    </div>
  );
}
