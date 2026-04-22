/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0f0f14",
          raised:  "#16161e",
          overlay: "#1e1e2a",
          high:    "#252535",
        },
        gold: {
          DEFAULT: "#d4a84b",
          light:   "#e8c068",
          dark:    "#b08c35",
          dim:     "rgba(212,168,75,0.12)",
        },
        win:  "#34d399",
        loss: "#f87171",
        pending: "#fbbf24",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        sans:    ["Barlow", "system-ui", "sans-serif"],
      },
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "1rem" }],
      },
      boxShadow: {
        card:          "0 0 0 1px rgba(212,168,75,0.15), 0 4px 24px rgba(0,0,0,0.6)",
        "card-hover":  "0 0 0 1px rgba(212,168,75,0.4), 0 8px 32px rgba(0,0,0,0.7)",
        "card-selected": "0 0 0 2px #d4a84b, 0 8px 32px rgba(212,168,75,0.2)",
        "gold-glow":   "0 0 20px rgba(212,168,75,0.3)",
        "win-glow":    "0 0 20px rgba(52,211,153,0.25)",
        "loss-glow":   "0 0 20px rgba(248,113,113,0.25)",
      },
      animation: {
        "fade-in":      "fadeIn 0.2s ease-out",
        "fade-in-up":   "fadeInUp 0.25s cubic-bezier(0.16,1,0.3,1)",
        "slide-in":     "slideIn 0.2s cubic-bezier(0.16,1,0.3,1)",
        "shimmer":      "shimmer 1.6s infinite",
        "pulse-gold":   "pulseGold 2s ease-in-out infinite",
        "count-up":     "countUp 0.4s cubic-bezier(0.16,1,0.3,1)",
        "spin-slow":    "spin 3s linear infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        fadeInUp: {
          from: { opacity: 0, transform: "translateY(10px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: 0, transform: "translateX(-8px)" },
          to:   { opacity: 1, transform: "translateX(0)" },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseGold: {
          "0%, 100%": { opacity: 1 },
          "50%":      { opacity: 0.6 },
        },
        countUp: {
          from: { opacity: 0, transform: "translateY(4px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};
