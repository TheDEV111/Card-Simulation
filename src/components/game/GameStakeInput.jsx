import StakeSlider from "../ui/StakeSlider";
import STXAmount from "../ui/STXAmount";
import { WIN_MULTIPLIER } from "../../utils/constants";

export default function GameStakeInput({ value, onChange }) {
  const potentialWin = value * WIN_MULTIPLIER;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="label-caps">Stake</p>
        <div className="text-right">
          <p className="text-xs text-white/30">Potential win</p>
          <p className="text-sm font-semibold text-win">
            <STXAmount ustx={potentialWin} />
          </p>
        </div>
      </div>
      <StakeSlider value={value} onChange={onChange} />
    </div>
  );
}
