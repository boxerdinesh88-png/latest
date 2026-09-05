import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Semantic tokens resolved via CSS variables that flip per theme
        base: 'rgb(var(--base) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        faint: 'rgb(var(--faint) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
          soft: 'rgb(var(--accent-soft) / <alpha-value>)',
        },
        pink: {
          DEFAULT: 'rgb(var(--pink) / <alpha-value>)',
          soft: 'rgb(var(--pink-soft) / <alpha-value>)',
        },
        cyan: {
          DEFAULT: 'rgb(var(--cyan) / <alpha-value>)',
          soft: 'rgb(var(--cyan-soft) / <alpha-value>)',
        },
        violet: {
          DEFAULT: 'rgb(var(--violet) / <alpha-value>)',
        },
        cream: {
          DEFAULT: 'rgb(var(--cream) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        display: ['Unbounded', '"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 20px 60px rgba(0,0,0,0.35)',
        'card-light': '0 20px 50px -12px rgba(20,16,60,0.18)',
        'card-lg': '0 40px 90px rgba(0,0,0,0.5)',
        glow: '0 0 40px rgba(124,58,237,0.35)',
        'glow-cyan': '0 0 40px rgba(34,211,238,0.3)',
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(120deg, #7c3aed 0%, #ec4899 50%, #22d3ee 100%)',
        'gradient-accent-soft':
          'linear-gradient(120deg, rgba(124,58,237,0.14), rgba(236,72,153,0.14), rgba(34,211,238,0.14))',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'float-y': 'floatY 7s ease-in-out infinite',
        'spin-slow': 'spin 22s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-18px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
