export default function SafeArea({ children, className = "" }) {
  return (
    <div
      className={`px-4 md:px-6 lg:px-8 max-w-screen-xl mx-auto ${className}`}
      style={{ paddingLeft: "max(1rem, env(safe-area-inset-left))", paddingRight: "max(1rem, env(safe-area-inset-right))" }}
    >
      {children}
    </div>
  );
}
