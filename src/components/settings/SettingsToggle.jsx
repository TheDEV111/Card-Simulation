import { useId } from "react";
import SettingsRow from "./SettingsRow";

export default function SettingsToggle({ label, description, value, onChange }) {
  const id = useId();

  return (
    <SettingsRow label={label} description={description} htmlFor={id}>
      <button
        id={id}
        role="switch"
        aria-checked={value}
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5.5 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
          value ? "bg-gold" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${
            value ? "translate-x-4.5" : "translate-x-0"
          }`}
          style={{ width: "18px", height: "18px", top: "2px", left: "2px",
                   transform: value ? "translateX(18px)" : "translateX(0)" }}
        />
        <span className="sr-only">{value ? "On" : "Off"}</span>
      </button>
    </SettingsRow>
  );
}
