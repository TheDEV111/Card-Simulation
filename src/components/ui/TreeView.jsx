import { useState } from "react";

function TreeNode({ node, level = 0, renderLabel, onSelect, selected }) {
  const [open, setOpen] = useState(level < 1);
  const hasChildren = node.children?.length > 0;
  const isSelected = selected === node.id;

  return (
    <div>
      <div
        className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
          isSelected
            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={() => { onSelect?.(node); if (hasChildren) setOpen((o) => !o); }}
      >
        {hasChildren ? (
          <span className="text-gray-400 text-xs">{open ? "▾" : "▸"}</span>
        ) : (
          <span className="w-3" />
        )}
        {renderLabel ? renderLabel(node) : <span>{node.label}</span>}
      </div>
      {hasChildren && open && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              renderLabel={renderLabel}
              onSelect={onSelect}
              selected={selected}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ nodes = [], renderLabel, onSelect, className = "" }) {
  const [selected, setSelected] = useState(null);

  function handleSelect(node) {
    setSelected(node.id);
    onSelect?.(node);
  }

  return (
    <div className={className}>
      {nodes.map((node) => (
        <TreeNode key={node.id} node={node} renderLabel={renderLabel} onSelect={handleSelect} selected={selected} />
      ))}
    </div>
  );
}
