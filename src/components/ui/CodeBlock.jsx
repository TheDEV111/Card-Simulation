import { useClipboard } from "../../hooks/useClipboard";

export default function CodeBlock({ code, language = "", className = "" }) {
  const { copy, copied } = useClipboard();

  return (
    <div className={`relative group rounded-xl bg-white/4 border border-white/8 overflow-hidden ${className}`}>
      {language && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/3">
          <span className="text-[10px] text-white/30 uppercase tracking-wider">{language}</span>
          <button
            onClick={() => copy(code)}
            className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      )}
      <pre className="p-4 overflow-x-auto text-xs text-white/60 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
      {!language && (
        <button
          onClick={() => copy(code)}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-[10px] text-white/30 hover:text-white/60 bg-white/8 px-2 py-1 rounded transition-all"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      )}
    </div>
  );
}
