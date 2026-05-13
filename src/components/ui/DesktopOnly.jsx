export default function DesktopOnly({ children }) {
  return <div className="hidden sm:block">{children}</div>;
}
