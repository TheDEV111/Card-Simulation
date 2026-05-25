export function MentionBadge({ username, avatar, href, onClick, size = "sm" }) {
  const sizes = {
    xs: "text-xs px-1.5 py-0.5",
    sm: "text-sm px-2 py-0.5",
    md: "text-base px-2.5 py-1",
  };

  const Tag = href ? "a" : "button";

  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`inline-flex items-center gap-1 rounded-full bg-indigo-50 text-indigo-700 font-medium hover:bg-indigo-100 transition-colors ${sizes[size] ?? sizes.sm}`}
    >
      {avatar ? (
        <img src={avatar} alt="" className="w-4 h-4 rounded-full object-cover" />
      ) : (
        <span className="w-4 h-4 rounded-full bg-indigo-200 flex items-center justify-center text-[10px] font-bold text-indigo-600">
          {username?.[0]?.toUpperCase()}
        </span>
      )}
      <span>@{username}</span>
    </Tag>
  );
}
