export function treeMap(node, fn, childKey = "children") {
  return {
    ...fn(node),
    [childKey]: (node[childKey] || []).map((child) => treeMap(child, fn, childKey)),
  };
}

export function treeFind(node, predicate, childKey = "children") {
  if (predicate(node)) return node;
  for (const child of node[childKey] || []) {
    const found = treeFind(child, predicate, childKey);
    if (found) return found;
  }
  return null;
}

export function treeFlatten(node, childKey = "children") {
  const result = [node];
  for (const child of node[childKey] || []) {
    result.push(...treeFlatten(child, childKey));
  }
  return result;
}

export function treeDepth(node, childKey = "children") {
  const children = node[childKey] || [];
  if (!children.length) return 0;
  return 1 + Math.max(...children.map((c) => treeDepth(c, childKey)));
}

export function listToTree(items, { id = "id", parentId = "parentId", childKey = "children" } = {}) {
  const map = new Map(items.map((item) => [item[id], { ...item, [childKey]: [] }]));
  const roots = [];
  for (const item of map.values()) {
    const parent = map.get(item[parentId]);
    if (parent) parent[childKey].push(item);
    else roots.push(item);
  }
  return roots;
}
