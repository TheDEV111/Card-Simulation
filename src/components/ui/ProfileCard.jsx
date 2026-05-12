export default function ProfileCard({ name, handle, avatar, bio, stats = [], actions, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-gray-900 dark:ring-gray-800 ${className}`}>
      <div className="h-16 bg-gradient-to-r from-indigo-500 to-purple-600" />
      <div className="px-5 pb-5">
        <div className="-mt-8 mb-3 flex items-end justify-between">
          <div className="h-16 w-16 rounded-xl ring-4 ring-white dark:ring-gray-900 overflow-hidden bg-indigo-100">
            {avatar ? (
              <img src={avatar} alt={name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-indigo-600">
                {name?.[0]?.toUpperCase()}
              </div>
            )}
          </div>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
        <p className="font-semibold text-gray-900 dark:text-white">{name}</p>
        {handle && <p className="text-sm text-gray-400">@{handle}</p>}
        {bio && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{bio}</p>}
        {stats.length > 0 && (
          <div className="mt-4 flex gap-6">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <p className="text-base font-bold text-gray-900 dark:text-white">{value}</p>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
