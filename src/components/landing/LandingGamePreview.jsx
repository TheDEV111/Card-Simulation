import { useState } from "react";
import CardPicker from "../ui/CardPicker";
import StakeSlider from "../ui/StakeSlider";
import { formatSTX } from "../../utils/format";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function LandingGamePreview() {
  const [card, setCard]   = useState(null);
  const [stake, setStake] = useState(10_000);

  return (
    <section className="px-6 py-16 border-t border-white/5">
      <div className="max-w-sm mx-auto space-y-6">
        <div className="text-center space-y-1">
          <p className="label-caps">Try the interface</p>
          <p className="text-xl font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Pick your card
          </p>
          <p className="text-sm text-white/40">
            This is just a preview — connect to play for real.
          </p>
        </div>
        <div className="panel p-6 space-y-6">
          <CardPicker selected={card} onChange={setCard} />
          <StakeSlider value={stake} onChange={setStake} />
          <Link
            to={ROUTES.GAME}
            className="block text-center py-4 rounded-xl bg-gold text-surface font-bold hover:bg-gold-light transition-colors duration-150"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {card ? `Play ${formatSTX(stake)} on ♠♥♦`[card - 1] || "Play for real →" : "Connect to play"}
          </Link>
        </div>
      </div>
    </section>
  );
}
