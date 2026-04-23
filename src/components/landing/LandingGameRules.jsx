import LandingRulesCard from "./LandingRulesCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";
import SectionHeading from "../ui/SectionHeading";

export default function LandingGameRules() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-16 border-t border-white/5">
      <div className="max-w-lg mx-auto space-y-6">
        <div style={fadeInUpStyle(visible, 0)}>
          <SectionHeading
            title="Rules of play"
            subtitle="Simple enough to explain in four lines."
          />
        </div>
        <div style={fadeInUpStyle(visible, 80)}>
          <LandingRulesCard />
        </div>
      </div>
    </section>
  );
}
