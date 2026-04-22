export default function TouchTarget({ children, className = "", ...props }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center min-h-[44px] min-w-[44px] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
