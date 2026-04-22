import { MOCK_GAMES, MOCK_LEADERBOARD } from "../../utils/mockData";
import HeroStat from "../ui/HeroStat";
import Divider from "../ui/Divider";
import { formatSTX } from "../../utils/format";

const totalGames   = MOCK_GAMES.length;
const totalStaked  = MOCK_GAMES.reduce((s, g) => s + g.stake, 0);
const totalPlayers = MOCK_LEADERBOARD.length;

export default function LandingStats() {
  return (
    <section className="border-y border-white/5 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <p className="text-center label-caps mb-10">By the numbers</p>
        <div className="grid grid-cols-3 gap-8">
          <HeroStat label="Games played" value={totalGames} />
          <HeroStat label="Total staked" value={5.42} suffix=" STX" animate={false} />
          <HeroStat label="Active players" value={totalPlayers} />
        </div>
      </div>
    </section>
  );
}
