export default function SuccessCheck({ size = 48, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" className="text-win/30" />
      <circle
        cx="24" cy="24" r="22"
        stroke="currentColor" strokeWidth="2"
        className="text-win"
        strokeDasharray="138"
        strokeDashoffset="0"
        strokeLinecap="round"
        style={{
          animation: "draw-circle 0.5s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      />
      <polyline
        points="14,24 21,31 34,18"
        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
        className="text-win"
        style={{ animation: "draw-check 0.4s 0.3s cubic-bezier(0.16,1,0.3,1) both" }}
      />
    </svg>
  );
}
