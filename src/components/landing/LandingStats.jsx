import HeroStat from "../ui/HeroStat";
import { useLandingStats } from "../../hooks/useLandingStats";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";

export default function LandingStats() {
  const { totalGames, totalPlayers, totalWinners } = useLandingStats();
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="border-y border-white/5 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-center label-caps mb-10" style={fadeInUpStyle(visible, 0)}>
          By the numbers
        </p>
        <div className="grid grid-cols-3 gap-8">
          {[
            { label: "Games played", value: totalGames, delay: 60 },
            { label: "Active players", value: totalPlayers, delay: 120 },
            { label: "Total winners", value: totalWinners, delay: 180 },
          ].map(({ label, value, delay }) => (
            <div key={label} style={fadeInUpStyle(visible, delay)}>
              <HeroStat label={label} value={value} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
