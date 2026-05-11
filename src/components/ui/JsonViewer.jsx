import { useState } from "react";

function JsonNode({ value, depth = 0 }) {
  const [collapsed, setCollapsed] = useState(depth > 1);

  if (value === null) return <span className="text-gray-400">null</span>;
  if (typeof value === "boolean") return <span className="text-blue-500">{String(value)}</span>;
  if (typeof value === "number") return <span className="text-green-500">{value}</span>;
  if (typeof value === "string") return <span className="text-amber-600 dark:text-amber-400">"{value}"</span>;

  const isArray = Array.isArray(value);
  const entries = isArray ? value.map((v, i) => [i, v]) : Object.entries(value);
  const open = isArray ? "[" : "{";
  const close = isArray ? "]" : "}";

  if (entries.length === 0) return <span className="text-gray-400">{open}{close}</span>;

  return (
    <span>
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        {collapsed ? `${open}…${close}` : open}
      </button>
      {!collapsed && (
        <span>
          {entries.map(([k, v]) => (
            <div key={k} style={{ paddingLeft: 16 }}>
              {!isArray && (
                <span className="text-indigo-500 dark:text-indigo-400">"{k}": </span>
              )}
              <JsonNode value={v} depth={depth + 1} />
              {","}
            </div>
          ))}
          {close}
        </span>
      )}
    </span>
  );
}

export default function JsonViewer({ data, className = "" }) {
  return (
    <pre className={`overflow-auto rounded-xl bg-gray-950 p-4 font-mono text-xs text-gray-200 ${className}`}>
      <JsonNode value={data} />
    </pre>
  );
}
