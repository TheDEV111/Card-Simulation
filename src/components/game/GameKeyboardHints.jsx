import KeyboardShortcut from "../ui/KeyboardShortcut";

export default function GameKeyboardHints({ className = "" }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <span className="flex items-center gap-1.5 text-xs text-white/20">
        <KeyboardShortcut keys={["1", "2", "3"]} /> Pick suit
      </span>
      <span className="flex items-center gap-1.5 text-xs text-white/20">
        <KeyboardShortcut keys={["Enter"]} /> Play
      </span>
      <span className="flex items-center gap-1.5 text-xs text-white/20">
        <KeyboardShortcut keys={["Esc"]} /> Reset
      </span>
    </div>
  );
}
