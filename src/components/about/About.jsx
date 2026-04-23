import AboutHero from "./AboutHero";
import AboutHowItWorks from "./AboutHowItWorks";
import AboutStats from "./AboutStats";
import AboutFAQ from "./AboutFAQ";

export default function About({ onBack }) {
  return (
    <div className="w-full max-w-sm mx-auto space-y-10 pb-16">
      <AboutHero />
      <AboutHowItWorks />
      <AboutStats />
      <AboutFAQ />
      <button className="btn-ghost w-full" onClick={onBack}>
        ← Back to game
      </button>
    </div>
  );
}
