const PALETTE = [
  "#7c3aed","#db2777","#d97706","#059669",
  "#2563eb","#dc2626","#9333ea","#0891b2",
];

export function avatarColor(address) {
  if (!address) return PALETTE[0];
  let hash = 0;
  for (let i = 0; i < address.length; i++) {
    hash = address.charCodeAt(i) + ((hash << 5) - hash);
  }
  return PALETTE[Math.abs(hash) % PALETTE.length];
}

export function avatarInitials(address) {
  if (!address) return "??";
  return address.slice(2, 4).toUpperCase();
}
