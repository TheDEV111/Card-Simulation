export default function ScaleOnHover({ scale = 1.03, children, className = "" }) {
  return (
    <div
      className={`transition-transform duration-200 ease-out hover:scale-[${scale}] active:scale-[0.98] ${className}`}
      style={{ "--hover-scale": scale }}
    >
      {children}
    </div>
  );
}
