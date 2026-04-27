/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        syne:  ["Syne", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono:  ["Space Mono", "monospace"],
      },
      colors: {
        cream: "#F2EFE9",
        ink:   "#0E0E0D",
        teal:  { DEFAULT: "#0D9488", dim: "rgba(13,148,136,0.12)" },
        dark:  { DEFAULT: "#0C0C0B", 2: "#141413", border: "#232321" },
        muted: "#6B6B65",
      },
    },
  },
  plugins: [],
}