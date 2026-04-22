import CardSymbol from "./CardSymbol";

const SUITS = [1, 2, 3];

export default function CardSuitLegend() {
  return (
    <div className="flex items-center gap-6 justify-center">
      {SUITS.map((id) => (
        <div key={id} className="text-center space-y-1">
          <CardSymbol card={id} size="lg" />
          <CardSymbol card={id} size="sm" showName />
        </div>
      ))}
    </div>
  );
}
