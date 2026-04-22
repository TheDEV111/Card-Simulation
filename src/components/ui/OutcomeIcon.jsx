export default function OutcomeIcon({ outcome, size = "md" }) {
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl" };

  if (outcome === "win") {
    return <span className={`${sizes[size]} text-win`} aria-label="Win">↑</span>;
  }
  if (outcome === "loss") {
    return <span className={`${sizes[size]} text-loss`} aria-label="Loss">↓</span>;
  }
  return <span className={`${sizes[size]} text-pending`} aria-label="Pending">◦</span>;
}
