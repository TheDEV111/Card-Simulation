import { cn } from "../../utils/cn";

export default function ExternalLink({ href, children, className }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("text-gold/80 hover:text-gold underline-offset-2 hover:underline transition-colors duration-150", className)}
    >
      {children} ↗
    </a>
  );
}
