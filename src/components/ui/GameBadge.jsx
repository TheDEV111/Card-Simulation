import Badge from "./Badge";

export default function GameBadge({ outcome }) {
  const map = {
    win:  { variant: "win",  label: "Win" },
    loss: { variant: "loss", label: "Loss" },
  };
  const entry = map[outcome] ?? { variant: "default", label: outcome };
  return <Badge variant={entry.variant}>{entry.label}</Badge>;
}
