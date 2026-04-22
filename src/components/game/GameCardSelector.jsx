import CardPicker from "../ui/CardPicker";
import CardSuitLegend from "../ui/CardSuitLegend";

export default function GameCardSelector({ selected, onChange }) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <p className="label-caps">Choose your suit</p>
        <p className="text-xs text-white/30">Pick one — the contract draws the rest.</p>
      </div>
      <CardPicker selected={selected} onChange={onChange} />
      <CardSuitLegend />
    </div>
  );
}
