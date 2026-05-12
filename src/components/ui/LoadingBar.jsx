import { useEffect, useState } from "react";

export default function LoadingBar({ loading = false, color = "bg-indigo-500" }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (loading) {
      setProgress(0);
      setVisible(true);
      const t1 = setTimeout(() => setProgress(30), 50);
      const t2 = setTimeout(() => setProgress(60), 400);
      const t3 = setTimeout(() => setProgress(85), 900);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    } else {
      setProgress(100);
      const hide = setTimeout(() => { setVisible(false); setProgress(0); }, 400);
      return () => clearTimeout(hide);
    }
  }, [loading]);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 h-0.5 bg-gray-100 dark:bg-gray-800">
      <div
        className={`h-full ${color} transition-all duration-300 ease-out`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
