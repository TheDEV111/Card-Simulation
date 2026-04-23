import SectionHeading from "../ui/SectionHeading";
import FAQAccordion from "../ui/FAQAccordion";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";

export default function LandingFAQ() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-8">
        <div style={fadeInUpStyle(visible, 0)}>
          <SectionHeading
            title="Common questions"
            subtitle="Everything you need before your first play."
          />
        </div>
        <div style={fadeInUpStyle(visible, 80)}>
          <FAQAccordion />
        </div>
      </div>
    </section>
  );
}
