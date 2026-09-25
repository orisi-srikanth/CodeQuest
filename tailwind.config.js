/**
 * CodeQuest — Tailwind design tokens.
 * Single source of truth for colour, type scale and motion across the app.
 * Accents are derived from the brand mark: signal cyan + signal magenta.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Base surfaces (dark, professional — not pure black)
        ink: {
          950: '#05070d',
          900: '#080b14',
          850: '#0b0f1a',
          800: '#101623',
          700: '#161d2d',
          600: '#1e2637',
          500: '#2a3446',
          400: '#3b4759',
        },
        // Text
        slate: {
          25: '#f6f8fc',
        },
        // Brand accents (matching the CodeQuest mark)
        signal: {
          cyan: '#22d3ee',
          'cyan-soft': '#67e8f9',
          'cyan-deep': '#0891b2',
          magenta: '#ec4899',
          'magenta-soft': '#f472b6',
          'magenta-deep': '#be185d',
          amber: '#fbbf24',
        },
        // UI accents — the restrained blue / mint / pale trio used by the
        // hero and the algorithm panel. Magenta stays exclusive to the logo.
        accent: {
          blue: '#7dd3fc',
          'blue-deep': '#38bdf8',
          'blue-dim': '#1e3a5f',
          mint: '#34d399',
          'mint-deep': '#10b981',
          pale: '#dbe3f7',
          'pale-hover': '#eef2fb',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        // handwriting — signature only, never for UI
        signature: ['"Caveat Variable"', 'Segoe Script', 'cursive'],
      },
      fontSize: {
        // Fluid type scale for the hero + section headings
        'display-sm': ['clamp(2rem, 5vw, 2.75rem)', { lineHeight: '1.12', letterSpacing: '-0.02em' }],
        display: ['clamp(2.5rem, 7vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'display-lg': ['clamp(3rem, 9vw, 6rem)', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 24px 60px -30px rgba(0,0,0,0.9)',
        'glow-cyan': '0 0 0 1px rgba(34,211,238,0.25), 0 18px 50px -22px rgba(34,211,238,0.45)',
        'glow-magenta': '0 0 0 1px rgba(236,72,153,0.25), 0 18px 50px -22px rgba(236,72,153,0.4)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.07) 1px, transparent 1px)',
        'brand-line': 'linear-gradient(90deg, transparent, #22d3ee 35%, #ec4899 65%, transparent)',
      },
      backgroundSize: {
        grid: '56px 56px',
      },
      keyframes: {
        'fade-rise': {
          '0%': { opacity: '0', transform: 'translate3d(0, 18px, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
        'rise-mask': {
          '0%': { transform: 'translate3d(0, 110%, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -10px, 0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(6px, -14px, 0)' },
        },
        drift: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '100%': { transform: 'translate3d(-56px, -56px, 0)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.35' },
          '50%': { opacity: '0.75' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(500%)' },
        },
        'caret-blink': {
          '0%, 45%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        'bar-grow': {
          '0%, 100%': { transform: 'scaleY(0.45)' },
          '50%': { transform: 'scaleY(1)' },
        },
        'node-travel': {
          '0%, 100%': { transform: 'translateX(0)', opacity: '0.35' },
          '45%': { opacity: '1' },
          '100%': { transform: 'translateX(58px)', opacity: '0.35' },
        },
        'node-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.28)', opacity: '1' },
        },
        'pipe-flow': {
          '0%': { strokeDashoffset: '28' },
          '100%': { strokeDashoffset: '0' },
        },
        'ping-soft': {
          '0%': { transform: 'scale(1)', opacity: '0.9' },
          '70%, 100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'dash-draw': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        // --- shrine: incense smoke, diya flame, drifting lamplight ---
        'smoke-rise': {
          '0%': { opacity: '0', transform: 'translate3d(0, 12%, 0) scale(0.86)' },
          '22%': { opacity: '0.5' },
          '60%': { opacity: '0.32', transform: 'translate3d(2.2%, -34%, 0) scale(1.02)' },
          '100%': { opacity: '0', transform: 'translate3d(-2.4%, -82%, 0) scale(1.22)' },
        },
        'flame-flicker': {
          '0%, 100%': { transform: 'scale3d(1, 1, 1) skewX(0deg)', opacity: '1' },
          '22%': { transform: 'scale3d(0.94, 1.07, 1) skewX(-3deg)', opacity: '0.9' },
          '48%': { transform: 'scale3d(1.05, 0.94, 1) skewX(2.5deg)', opacity: '1' },
          '74%': { transform: 'scale3d(0.97, 1.04, 1) skewX(-1.6deg)', opacity: '0.94' },
        },
        'glow-drift': {
          '0%': { transform: 'translate3d(-4%, 2%, 0) scale(1)', opacity: '0.5' },
          '50%': { transform: 'translate3d(5%, -3%, 0) scale(1.14)', opacity: '0.78' },
          '100%': { transform: 'translate3d(-2%, -6%, 0) scale(1.05)', opacity: '0.6' },
        },
        'halo-breathe': {
          '0%, 100%': { opacity: '0.34', transform: 'scale(1)' },
          '50%': { opacity: '0.62', transform: 'scale(1.09)' },
        },
      },
      animation: {
        'fade-rise': 'fade-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-mask': 'rise-mask 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.6s ease-out both',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        drift: 'drift 40s linear infinite',
        'pulse-soft': 'pulse-soft 5s ease-in-out infinite',
        sweep: 'sweep 6.5s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'caret-blink': 'caret-blink 1.1s steps(1, end) infinite',
        'bar-grow': 'bar-grow 2.8s ease-in-out infinite',
        'node-travel': 'node-travel 4.2s ease-in-out infinite',
        'node-pulse': 'node-pulse 3.6s ease-in-out infinite',
        'pipe-flow': 'pipe-flow 2.4s linear infinite',
        'ping-soft': 'ping-soft 2.4s cubic-bezier(0, 0, 0.2, 1) infinite',
        'dash-draw': 'dash-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) both',
        'smoke-rise': 'smoke-rise 13s ease-in-out infinite',
        'flame-flicker': 'flame-flicker 2.6s ease-in-out infinite',
        'glow-drift': 'glow-drift 17s ease-in-out infinite',
        'halo-breathe': 'halo-breathe 6.5s ease-in-out infinite',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
}
