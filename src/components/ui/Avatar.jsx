import { avatarColor, avatarInitials } from "../../utils/avatar";

const SIZES = {
  xs: "w-6 h-6 text-[10px]",
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-lg",
};

export default function Avatar({ address, size = "md", className = "" }) {
  const initials = avatarInitials(address);
  const color = avatarColor(address);

  return (
    <div
      className={`rounded-full flex items-center justify-center font-bold flex-shrink-0 ${SIZES[size]} ${className}`}
      style={{ backgroundColor: color + "33", color, border: `1px solid ${color}40` }}
      aria-label={address}
    >
      {initials}
    </div>
  );
}
