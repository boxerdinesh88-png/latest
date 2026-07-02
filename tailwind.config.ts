import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: '#8B5CF6',
        'accent-light': '#A78BFA',
        'accent-dark': '#7C3AED',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        foreground: 'var(--color-foreground)',
        muted: 'var(--color-muted)',
      },
      fontFamily: {
        display: ['Inter', 'system-ui'],
        sans: ['Inter', 'system-ui'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'aurora': 'aurora 8s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-20px) rotate(1deg)' },
          '66%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        aurora: {
          '0%, 100%': { opacity: '0.3', transform: 'translate(0, 0) scale(1)' },
          '25%': { opacity: '0.5', transform: 'translate(-50px, -30px) scale(1.1)' },
          '50%': { opacity: '0.4', transform: 'translate(50px, 20px) scale(0.9)' },
          '75%': { opacity: '0.6', transform: 'translate(-30px, 50px) scale(1.05)' },
        },
        ripple: {
          '0%': { boxShadow: '0 0 0 0 rgba(139, 92, 246, 0.4), 0 0 0 0 rgba(139, 92, 246, 0.2)' },
          '100%': { boxShadow: '0 0 0 20px rgba(139, 92, 246, 0), 0 0 0 40px rgba(139, 92, 246, 0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
