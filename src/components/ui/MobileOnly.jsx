export default function MobileOnly({ children }) {
  return <div className="sm:hidden">{children}</div>;
}
