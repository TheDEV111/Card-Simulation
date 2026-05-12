import { useTimeAgo } from "../../hooks/useTimeAgo";

function ActivityItem({ icon, title, meta, timestamp }) {
  const ago = useTimeAgo(timestamp);
  return (
    <div className="flex items-start gap-3 py-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm dark:bg-gray-800">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{title}</p>
        {meta && <p className="text-xs text-gray-500 dark:text-gray-400">{meta}</p>}
      </div>
      <time className="shrink-0 text-xs text-gray-400">{ago}</time>
    </div>
  );
}

export default function ActivityCard({ title = "Recent Activity", items = [], className = "" }) {
  return (
    <div className={`rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
      <div className="mt-2 divide-y divide-gray-100 dark:divide-gray-800">
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-gray-400">No recent activity</p>
        ) : (
          items.map((item, i) => <ActivityItem key={i} {...item} />)
        )}
      </div>
    </div>
  );
}
