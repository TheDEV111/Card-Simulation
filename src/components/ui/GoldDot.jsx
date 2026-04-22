export default function GoldDot({ size = "sm" }) {
  const sizes = { sm: "w-1.5 h-1.5", md: "w-2 h-2", lg: "w-2.5 h-2.5" };
  return (
    <span
      className={`inline-block rounded-full bg-gold ${sizes[size]}`}
      aria-hidden="true"
    />
  );
}
