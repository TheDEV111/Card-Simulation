import { useEffect, useState } from "react";

export default function SettingsSaved({ trigger }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!trigger) return;
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(t);
  }, [trigger]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-win/20 text-win text-xs px-4 py-2 rounded-full shadow-lg"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <span>✓</span> Settings saved
    </div>
  );
}
