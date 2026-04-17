/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0f0f14",
          raised: "#16161e",
          overlay: "#1e1e2a",
        },
        gold: {
          DEFAULT: "#d4a84b",
          light: "#e8c068",
          dark: "#b08c35",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 0 0 1px rgba(212,168,75,0.15), 0 4px 24px rgba(0,0,0,0.6)",
        "card-hover": "0 0 0 1px rgba(212,168,75,0.4), 0 8px 32px rgba(0,0,0,0.7)",
        "card-selected": "0 0 0 2px #d4a84b, 0 8px 32px rgba(212,168,75,0.2)",
      },
    },
  },
  plugins: [],
};
