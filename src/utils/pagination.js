export function paginate(arr, page, perPage) {
  const start = (page - 1) * perPage;
  return {
    items: arr.slice(start, start + perPage),
    total: arr.length,
    page,
    perPage,
    totalPages: Math.ceil(arr.length / perPage),
    hasNext: start + perPage < arr.length,
    hasPrev: page > 1,
  };
}

export function getPageRange(currentPage, totalPages, delta = 2) {
  const range = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  range.push(1);
  if (left > 2) range.push("...");
  for (let i = left; i <= right; i++) range.push(i);
  if (right < totalPages - 1) range.push("...");
  if (totalPages > 1) range.push(totalPages);

  return range;
}

export function cursorPaginate(arr, cursor, limit, keyFn = (x) => x.id) {
  const startIdx = cursor ? arr.findIndex((item) => keyFn(item) === cursor) + 1 : 0;
  const items = arr.slice(startIdx, startIdx + limit);
  const nextCursor = items.length === limit ? keyFn(items[items.length - 1]) : null;
  return { items, nextCursor, hasMore: nextCursor !== null };
}
