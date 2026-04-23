import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useGlobalStats } from "../../hooks/useGlobalStats";
import AnimatedCounter from "../ui/AnimatedCounter";
import Spotlight from "../ui/Spotlight";

export default function HeroSection({ className = "" }) {
  const { totalGames, totalVolume, activePlayers } = useGlobalStats();

  return (
    <section className={`relative overflow-hidden py-20 px-6 text-center ${className}`}>
      <Spotlight className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        <p className="text-xs font-semibold text-gold uppercase tracking-[0.2em]">
          On-chain · Verifiable · Fair
        </p>

        <h1
          className="text-5xl sm:text-6xl font-bold text-white leading-tight"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Draw the winning card
        </h1>

        <p className="text-base text-white/50 max-w-md mx-auto leading-relaxed">
          Pick a suit, stake STX, and let the blockchain decide. 1-in-3 odds. 3× payout.
          Fully on-chain with Stacks smart contracts.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link to={ROUTES.GAME} className="btn-primary px-8 py-3 text-sm">
            Play now
          </Link>
          <Link to={ROUTES.LEADERBOARD} className="btn-secondary px-8 py-3 text-sm">
            View leaderboard
          </Link>
        </div>

        <div className="flex flex-wrap justify-center gap-8 pt-6 text-center">
          {[
            { label: "Games played", value: totalGames },
            { label: "STX wagered",  value: Math.round(totalVolume / 1_000_000) },
            { label: "Players",      value: activePlayers },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold text-white tabular-nums" style={{ fontFamily: "Cinzel, serif" }}>
                <AnimatedCounter value={s.value} />
              </p>
              <p className="text-xs text-white/30 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
