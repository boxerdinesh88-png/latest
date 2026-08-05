import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#050816',
        surface: '#111827',
        'surface-2': '#1B2138',
        accent: '#7C3AED',
        'accent-light': '#A78BFA',
        'accent-dark': '#6D28D9',
        pink: { DEFAULT: '#EC4899', light: '#F472B6' },
        cyan: { DEFAULT: '#06B6D4', light: '#22D3EE' },
        foreground: '#FFFFFF',
        muted: '#CBD5E1',
        faint: '#94A3B8',
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['Poppins', 'Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'card': '0 20px 60px rgba(0,0,0,0.35)',
        'card-lg': '0 30px 80px rgba(0,0,0,0.45)',
        'glow-purple': '0 0 40px rgba(124,58,237,0.35)',
        'glow-cyan': '0 0 40px rgba(6,182,212,0.3)',
        'glow-pink': '0 0 40px rgba(236,72,153,0.3)',
        'btn': '0 8px 30px rgba(124,58,237,0.35)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)',
        'gradient-hero': 'linear-gradient(135deg, #7C3AED 0%, #EC4899 50%, #06B6D4 100%)',
        'radial-glow':
          'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)',
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-slower': 'float 12s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        'pulse-slow': 'pulse 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shine': 'shine 2.5s linear infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee2': 'marquee2 30s linear infinite',
        'blob': 'blob 14s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-24px) rotate(2deg)' },
          '66%': { transform: 'translateY(-12px) rotate(-2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 24px rgba(124,58,237,0.25)' },
          '50%': { boxShadow: '0 0 60px rgba(124,58,237,0.55)' },
        },
        shine: {
          '0%': { transform: 'translateX(-150%) skewX(-20deg)' },
          '100%': { transform: 'translateX(250%) skewX(-20deg)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(40px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-30px, 30px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
