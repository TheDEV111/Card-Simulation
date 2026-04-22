import SectionHeading from "../ui/SectionHeading";
import TopPlayersPreview from "../ui/TopPlayersPreview";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import LandingLiveFeed from "./LandingLiveFeed";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";

export default function LandingLeaderboard() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto grid sm:grid-cols-2 gap-8">
        <div className="space-y-4" style={fadeInUpStyle(visible, 0)}>
          <SectionHeading
            title="Top players"
            action={
              <Link to={ROUTES.LEADERBOARD} className="text-xs text-gold/70 hover:text-gold transition-colors">
                Full table →
              </Link>
            }
          />
          <TopPlayersPreview />
        </div>
        <div className="space-y-4" style={fadeInUpStyle(visible, 100)}>
          <LandingLiveFeed />
        </div>
      </div>
    </section>
  );
}
