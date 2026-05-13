export function ReadReceipt({ status = "sent", readAt, deliveredAt, className = "" }) {
  const config = {
    sending: { label: "Sending…", icon: "○", color: "text-gray-400" },
    sent: { label: "Sent", icon: "✓", color: "text-gray-400" },
    delivered: { label: "Delivered", icon: "✓✓", color: "text-gray-400" },
    read: { label: "Read", icon: "✓✓", color: "text-blue-500" },
  };

  const { label, icon, color } = config[status] ?? config.sent;

  const time = status === "read" ? readAt : status === "delivered" ? deliveredAt : null;

  return (
    <span className={`inline-flex items-center gap-1 text-xs ${color} ${className}`} title={label}>
      <span className="font-mono leading-none">{icon}</span>
      {time && <span className="text-gray-400">{time}</span>}
    </span>
  );
}
