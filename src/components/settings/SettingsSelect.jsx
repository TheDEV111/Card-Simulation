import { useId } from "react";
import SettingsRow from "./SettingsRow";

export default function SettingsSelect({ label, description, value, onChange, options }) {
  const id = useId();

  return (
    <SettingsRow label={label} description={description} htmlFor={id}>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/8 text-white/70 text-xs rounded-lg px-3 py-1.5 border border-white/10
                   focus:outline-none focus:ring-2 focus:ring-gold/50 appearance-none
                   cursor-pointer pr-7"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23ffffff66' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center" }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#1a1a2e]">{o.label}</option>
        ))}
      </select>
    </SettingsRow>
  );
}
