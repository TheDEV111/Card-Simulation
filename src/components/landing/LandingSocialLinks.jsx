import ExternalLink from "../ui/ExternalLink";

const LINKS = [
  { label: "GitHub", href: "https://github.com/TheDEV111/Card-Simulation", icon: "⌥" },
  { label: "Explorer", href: "https://explorer.stacks.co", icon: "⛓" },
];

export default function LandingSocialLinks() {
  return (
    <div className="flex items-center gap-3">
      {LINKS.map((link) => (
        <ExternalLink
          key={link.label}
          href={link.href}
          className="flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors"
        >
          <span>{link.icon}</span>
          <span>{link.label}</span>
        </ExternalLink>
      ))}
    </div>
  );
}
