export default function ScaleOnHover({ scale = 1.03, children, className = "" }) {
  return (
    <div
      className={`scale-on-hover transition-transform duration-200 ease-out active:scale-[0.98] ${className}`}
      style={{ "--hover-scale": scale }}
    >
      {children}
    </div>
  );
}
