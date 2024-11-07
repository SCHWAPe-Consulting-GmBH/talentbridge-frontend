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
      "light-success": "#E0F7E6",
      warning: "#E88F1B",
      "light-warning": "#FFF0D8",
      error: "#E21D1D",
      info: "#007AFF",
      "light-info": "#D9EBFF",
      white: "#FFFFFF",
      background: "var(--background)",
      "background-second": "var(--background-second)",
      "background-revert": "var(--background-revert)",
      themetext: "var(--themetext)"
    },
    fontFamily: {
      main: ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",

      },
      textShadow: {
        'custom': '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        loading: 'loading 3s linear infinite',
      },
      keyframes: {
        loading: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-textshadow')
  ],
};
export default config;
