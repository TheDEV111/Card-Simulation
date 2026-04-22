import HowToPlayCard from "../ui/HowToPlayCard";
import SectionHeading from "../ui/SectionHeading";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function LandingHowItWorks() {
  return (
    <section className="px-6 py-16 max-w-2xl mx-auto space-y-8">
      <SectionHeading
        title="How it works"
        subtitle="Four steps between you and a payout."
        action={
          <Link to={ROUTES.HOW_TO_PLAY} className="text-xs text-gold/70 hover:text-gold transition-colors">
            Full guide →
          </Link>
        }
      />
      <HowToPlayCard />
    </section>
  );
}
