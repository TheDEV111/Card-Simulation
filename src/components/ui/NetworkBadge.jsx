export default function NetworkBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-2xs font-medium bg-surface-overlay border border-white/10 text-white/40">
      <span className="w-1.5 h-1.5 rounded-full bg-stacks animate-pulse-stacks shrink-0" />
      Stacks Mainnet
    </span>
  );
}
