import type { Config } from 'tailwindcss';
import twColors from 'tailwindcss/colors';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      ...twColors,
      sky: 'twColors.sky',
      stone: 'twColors.stone',
      neutral: 'twColors.neutral',
      gray: 'twColors.gray',
      slate: 'twColors.slate',
      dark: '#222222',
      primary: '#5DE85B',
      secondary: '#000000',
      neutral1: '#1B1B1B',
      neutral2: '#9F9F9F',
      neutral3: '#F7F7F5',
      'opacity-primary': 'rgba(93, 232, 91, 0.1)',
      'opacity-warning': 'rgba(232, 143, 27, 0.1)',
      'opacity-info': 'rgba(0, 122, 255, 0.1)',
      'light-green': '#E0F7E6',
      'light-orange': '#FEEACC',
      'light-blue': '#C4CEFF',
      'opacity-green': 'rgba(82, 169, 130, 0.15)',
      'opacity-blue': 'rgba(82, 112, 255, 0.15)',
      'opacity-pink': 'rgba(197, 13, 149, 0.15)',
      'opacity-orange': 'rgba(248, 88, 54, 0.15)',
      'light-gray': '#E4E4E4',
      'dark-gray': '#4D4D4D',
      success: '#34C759',
      'light-success': '#E0F7E6',
      warning: '#E88F1B',
      'light-warning': '#FFF0D8',
      error: '#E21D1D',
      info: '#007AFF',
      'light-info': '#D9EBFF',
      white: '#FFFFFF',
      background: 'var(--background)',
      'background-second': 'var(--background-second)',
      'background-third': 'var(--background-third)',
      'background-fourth': 'var(--background-fourth)',
      'background-revert': 'var(--background-revert)',
      'shadow-revert': 'var(--shadow-revert)',
      themetext: 'var(--themetext)',
      'btn-text': 'var(--button-text)',
    },
    fontFamily: {
      main: ['Nunito Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      textShadow: {
        custom: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
      animation: {
        loading: 'loading 3s linear infinite',
        'loading-thirty-second': 'loading 30s ease-in-out infinite',
      },
      keyframes: {
        loading: {
          '0%': {
            width: '0%',
          },
          '100%': {
            width: '100%',
          },
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow'), require('tailwindcss-animate')],
  darkMode: ['class', 'class'],
};
export default config;
