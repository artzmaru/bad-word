import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0b1837',
          800: '#0f2347',
          700: '#162d5a',
          600: '#1e3a6e',
        },
        gold: '#f5c842',
        'xp-blue': '#38bdf8',
        'level-green': '#22c55e',
      },
      fontFamily: {
        sans: ['Noto Sans Thai', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'game-btn': '0 4px 0 rgba(0,0,0,0.4)',
        'game-card': '0 0 0 2px rgba(56,189,248,0.2)',
        'game-glow': '0 0 12px rgba(56,189,248,0.4)',
      },
      borderColor: {
        'game-border': 'rgba(56,189,248,0.25)',
      },
    },
  },
  plugins: [],
}
export default config
