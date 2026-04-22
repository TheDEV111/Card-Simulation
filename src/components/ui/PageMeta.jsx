import { useEffect } from "react";
import { APP_NAME } from "../../utils/constants";

export default function PageMeta({ title, description }) {
  useEffect(() => {
    const base = APP_NAME;
    document.title = title ? `${title} — ${base}` : base;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [title, description]);

  return null;
}
