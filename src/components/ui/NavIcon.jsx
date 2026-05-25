const icons = {
  home: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6.5L8 2l6 4.5V14a1 1 0 01-1 1H3a1 1 0 01-1-1V6.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M6 15v-5h4v5" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  play: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="2" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="5.5" y="4" width="9" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 8.5l2.5 1.5L8 11.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  dashboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="8.5" width="4" height="6" rx="0.75" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="6.5" y="5.5" width="4" height="9" rx="0.75" stroke="currentColor" strokeWidth="1.4"/>
      <rect x="11.5" y="2.5" width="3" height="12" rx="0.75" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  history: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 5v3.5l2.5 1.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  leaderboard: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 2l1.5 3 3.5.5-2.5 2.5.6 3.5L8 10l-3.1 1.5.6-3.5L3 5.5l3.5-.5L8 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  ),
  rewards: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M8 1.5C6 1.5 4.5 3 4.5 4.5c0 .8.3 1.4.7 1.9H2.5A1 1 0 001.5 7.5v1A1 1 0 002.5 9.5H3V13a1 1 0 001 1h8a1 1 0 001-1V9.5h.5a1 1 0 001-1v-1a1 1 0 00-1-1h-2.7c.4-.5.7-1.1.7-1.9C11.5 3 10 1.5 8 1.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M8 6.4V14" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  transactions: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2.5 5.5h11M10.5 2.5l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13.5 10.5h-11M5.5 7.5l-3 3 3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  howToPlay: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M6.5 6.2c0-1 .7-1.7 1.7-1.7s1.6.7 1.6 1.6c0 .8-.4 1.2-1 1.6C8.3 8 8 8.4 8 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="8" cy="11.5" r="0.75" fill="currentColor"/>
    </svg>
  ),
  settings: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  profile: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="5.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
};

export default function NavIcon({ name, className = "" }) {
  return (
    <span className={`flex items-center justify-center ${className}`} aria-hidden="true">
      {icons[name] ?? icons.home}
    </span>
  );
}
