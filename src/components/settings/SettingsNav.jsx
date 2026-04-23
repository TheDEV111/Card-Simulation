export default function SettingsNav({ tabs, active, onSelect }) {
  return (
    <nav className="flex flex-wrap gap-1 p-1 bg-white/5 rounded-xl" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onSelect(tab.id)}
          className={`px-4 py-1.5 text-xs rounded-lg transition-colors ${
            active === tab.id
              ? "bg-white/12 text-white"
              : "text-white/40 hover:text-white/60 hover:bg-white/5"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
