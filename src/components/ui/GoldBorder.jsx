export default function GoldBorder({ children, active = false, className = "" }) {
  return (
    <div
      className={`rounded-2xl transition-shadow duration-500 ${
        active
          ? "shadow-[0_0_0_1px_rgba(212,175,55,0.5),0_0_20px_rgba(212,175,55,0.1)]"
          : "shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
