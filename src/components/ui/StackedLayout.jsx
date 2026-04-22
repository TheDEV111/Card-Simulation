export default function StackedLayout({ children, gap = 4, className = "" }) {
  return (
    <div className={`flex flex-col gap-${gap} ${className}`}>
      {children}
    </div>
  );
}
