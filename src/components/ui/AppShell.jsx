export default function AppShell({ sidebar, topbar, children, className = "" }) {
  return (
    <div className={`flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-950 ${className}`}>
      {sidebar && (
        <div className="hidden shrink-0 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 lg:flex">
          {sidebar}
        </div>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        {topbar && (
          <div className="shrink-0">{topbar}</div>
        )}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
