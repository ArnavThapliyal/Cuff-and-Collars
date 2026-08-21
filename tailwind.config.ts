import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: {
          DEFAULT: "#0f0f0f",
          dim: "#171717",
          border: "#262626",
        },
        foreground: {
          DEFAULT: "#F5F5F5",
          muted: "#8E8E93",
          stark: "#FFFFFF",
        },
        zine: {
          black: "#000000",
          white: "#FFFFFF",
          paper: "#F4F3EF",
          cyan: "#00F5D4",
          mint: "#52B788",
          pink: "#F78DA7",
          sky: "#70C1B3",
          accent: "#00FFCC",
        },
      },
      fontFamily: {
        sans: [
          "Syne",
          "Uncut Sans",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        serif: [
          "Cinzel",
          "Playfair Display",
          "Georgia",
          "serif",
        ],
        mono: [
          "JetBrains Mono",
          "Space Mono",
          "Courier New",
          "monospace",
        ],
        display: [
          "Syne",
          "Impact",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        widest: "0.25em",
        mega: "0.35em",
      },
      boxShadow: {
        brutalist: "4px 4px 0px #000000",
        "brutalist-white": "4px 4px 0px #FFFFFF",
        "brutalist-cyan": "4px 4px 0px #00F5D4",
        "brutalist-pink": "4px 4px 0px #F78DA7",
        "brutalist-sm": "2px 2px 0px #000000",
      },
      borderRadius: {
        none: "0px",
      },
    },
  },
  plugins: [],
} satisfies Config;
