import { truncateAddress } from "../../utils/stacks";

function Avatar({ address, size = 32 }) {
  const color = `hsl(${parseInt(address?.slice(2, 6) ?? "00", 16) % 360}, 60%, 40%)`;
  const initials = address ? address.slice(2, 4).toUpperCase() : "??";

  return (
    <div
      title={address}
      className="rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold border-2 border-[#0f0f1a]"
      style={{ width: size, height: size, background: color, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  );
}

export default function AvatarGroup({ addresses = [], max = 4, size = 32, className = "" }) {
  const shown   = addresses.slice(0, max);
  const overflow = addresses.length - max;

  return (
    <div className={`flex items-center ${className}`}>
      {shown.map((addr, i) => (
        <div key={addr} style={{ marginLeft: i === 0 ? 0 : -size * 0.3, zIndex: shown.length - i }}>
          <Avatar address={addr} size={size} />
        </div>
      ))}
      {overflow > 0 && (
        <div
          className="rounded-full flex items-center justify-center text-white/40 bg-white/10 border-2 border-[#0f0f1a] text-[10px] font-semibold"
          style={{ width: size, height: size, marginLeft: -size * 0.3 }}
        >
          +{overflow}
        </div>
      )}
    </div>
  );
}
