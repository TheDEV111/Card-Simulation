import { formatRelativeTime } from "../../utils/format";

export default function RelativeTime({ timestamp, className = "" }) {
  return (
    <time
      dateTime={new Date(timestamp).toISOString()}
      title={new Date(timestamp).toLocaleString()}
      className={className}
    >
      {formatRelativeTime(timestamp)}
    </time>
  );
}
