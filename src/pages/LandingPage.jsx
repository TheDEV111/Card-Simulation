import LandingNav from "../components/landing/LandingNav";
import LandingHero from "../components/landing/LandingHero";
import LandingTrustBar from "../components/landing/LandingTrustBar";
import LandingStats from "../components/landing/LandingStats";
import LandingHowItWorks from "../components/landing/LandingHowItWorks";
import LandingFeatures from "../components/landing/LandingFeatures";
import LandingOdds from "../components/landing/LandingOdds";
import LandingLeaderboard from "../components/landing/LandingLeaderboard";
import LandingGamePreview from "../components/landing/LandingGamePreview";
import LandingFAQ from "../components/landing/LandingFAQ";
import LandingCTA from "../components/landing/LandingCTA";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-white">
      <LandingNav />
      <LandingHero />
      <LandingTrustBar />
      <LandingStats />
      <LandingHowItWorks />
      <LandingFeatures />
      <LandingOdds />
      <LandingLeaderboard />
      <LandingGamePreview />
      <LandingFAQ />
      <LandingCTA />
    </div>
  );
}
