import { avatarColor, avatarInitials } from "../../utils/avatar";
import { cn } from "../../utils/cn";

export default function WalletAvatar({ address, size = 36, className }) {
  const bg = avatarColor(address);
  const initials = avatarInitials(address);
  return (
    <div
      className={cn("rounded-full flex items-center justify-center shrink-0 font-bold text-white select-none", className)}
      style={{ width: size, height: size, background: bg, fontSize: size * 0.32 }}
    >
      {initials}
    </div>
  );
}
