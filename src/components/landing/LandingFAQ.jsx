import SectionHeading from "../ui/SectionHeading";
import FAQAccordion from "../ui/FAQAccordion";

export default function LandingFAQ() {
  return (
    <section className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-8">
        <SectionHeading
          title="Common questions"
          subtitle="Everything you need before your first play."
        />
        <FAQAccordion />
      </div>
    </section>
  );
}
