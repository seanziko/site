import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      background: 'rgb(11 16 32)',
      card: 'rgb(26 31 53)',
      border: 'rgba(255 255 255 / 0.1)',
      foreground: '#ffffff',
      'muted-foreground': 'rgba(255 255 255 / 0.65)',
      muted: 'rgba(255 255 255 / 0.08)',
      accent: '#00d084',
      'blue-500': '#0099ff',
      'teal-400': '#00d084',
      white: '#ffffff',
      black: '#000000',
      transparent: 'transparent',
      'yellow-300': '#fcd34d',
    },
    extend: {
      animation: {
        'float-book': 'float-book 3s ease-in-out infinite',
        'book-shadow': 'book-shadow 3s ease-in-out infinite',
        'fade-up': 'fade-up 0.6s ease-out',
      },
      keyframes: {
        'float-book': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'book-shadow': {
          '0%, 100%': { transform: 'scaleY(1)', opacity: '0.65' },
          '50%': { transform: 'scaleY(0.8)', opacity: '0.45' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
