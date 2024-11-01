import type { Config } from "tailwindcss";
import twColors from 'tailwindcss/colors';

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...twColors,
      sky: twColors.sky,
      stone: twColors.stone,
      neutral: twColors.neutral,
      gray: twColors.gray,
      slate: twColors.slate,
      primary: "#5DE85B",
      secondary: "#000000",
      neutral1: "#1B1B1B",
      neutral2: "#9F9F9F",
      neutral3: "#F7F7F5",
      success: "#34C759",
      warning: "#E88F1B",
      error: "#E21D1D",
      info: "#007AFF",
      "light-info": "#D9EBFF",
      white: "#FFFFFF"
    },
    fontFamily: {
      main: ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

      },
    },
  },
  plugins: [],
};
export default config;
