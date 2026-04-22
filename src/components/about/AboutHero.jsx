export default function AboutHero() {
  return (
    <div className="text-center space-y-4 py-10">
      <div className="flex items-center justify-center gap-3 mb-2">
        <span className="text-5xl">🃏</span>
      </div>
      <h1 className="text-3xl font-bold text-white tracking-tight">
        Stacks Card Game
      </h1>
      <p className="text-base text-white/50 max-w-sm mx-auto leading-relaxed">
        A provably fair on-chain card game built on the Stacks blockchain.
        Every draw is determined by a smart contract — no house tricks, no
        hidden logic.
      </p>
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-raised border border-white/10 text-xs text-white/40">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live on Stacks Mainnet
      </div>
    </div>
  );
}
