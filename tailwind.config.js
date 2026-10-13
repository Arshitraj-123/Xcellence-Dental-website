/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '360px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    extend: {
      colors: {
        enamel:      'var(--color-enamel)',
        pearl:       'var(--color-pearl)',
        linen:       'var(--color-linen)',
        ink:         'var(--color-ink)',
        muted:       'var(--color-muted)',
        pomegranate: {
          DEFAULT: 'var(--color-pomegranate)',
          dark:    'var(--color-pomegranate-dark)',
        },
        rosewater:   'var(--color-rosewater)',
        clove:       'var(--color-clove)',
        brass: {
          DEFAULT: 'var(--color-brass)',
          deep:    'var(--color-brass-deep)',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        serif:   ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        sans:    ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      /* Fluid type scale using clamp() – min @ 320px, max @ 1280px */
      fontSize: {
        'fluid-xs':   ['clamp(0.6875rem, 0.65rem + 0.19vw, 0.8125rem)',  { lineHeight: '1.5' }],
        'fluid-sm':   ['clamp(0.8125rem, 0.775rem + 0.19vw, 0.9375rem)', { lineHeight: '1.5' }],
        'fluid-base': ['clamp(0.9375rem, 0.89rem + 0.25vw, 1.0625rem)',  { lineHeight: '1.65' }],
        'fluid-lg':   ['clamp(1.0625rem, 0.99rem + 0.38vw, 1.25rem)',    { lineHeight: '1.5' }],
        'fluid-xl':   ['clamp(1.25rem, 1.13rem + 0.63vw, 1.5rem)',       { lineHeight: '1.35' }],
        'fluid-2xl':  ['clamp(1.5rem, 1.31rem + 0.94vw, 1.875rem)',      { lineHeight: '1.25' }],
        'fluid-3xl':  ['clamp(1.875rem, 1.56rem + 1.56vw, 2.5rem)',      { lineHeight: '1.2' }],
        'fluid-4xl':  ['clamp(2.25rem, 1.75rem + 2.5vw, 3.25rem)',       { lineHeight: '1.1' }],
        'fluid-5xl':  ['clamp(2.75rem, 2rem + 3.75vw, 4.25rem)',         { lineHeight: '1.05' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        'section':    'clamp(3.5rem, 3rem + 2.5vw, 6rem)',
        'section-lg': 'clamp(5rem, 4rem + 5vw, 9rem)',
      },
      borderRadius: {
        'card':      '24px',
        'card-lg':   '28px',
        'card-sm':   '20px',
      },
      maxWidth: {
        'container-xs': '360px',
        'container-sm': '640px',
        'container-md': '768px',
        'container-lg': '1024px',
        'container-xl': '1200px',
      },
      boxShadow: {
        'soft':           '0 20px 48px -24px rgba(42, 22, 32, 0.12)',
        'card-elevated':  '0 24px 60px -20px rgba(42, 22, 32, 0.18)',
        'dialog':         '0 32px 80px -20px rgba(42, 22, 32, 0.28)',
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-bottom': {
          from: { opacity: '0', transform: 'translateY(100%)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'shine-sweep': {
          from: { transform: 'translateX(-100%)' },
          to:   { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-in':        'fade-in 0.3s ease-out',
        'fade-in-up':     'fade-in-up 0.4s ease-out',
        'slide-in-bottom':'slide-in-bottom 0.35s ease-out',
        'shine-sweep':    'shine-sweep 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};
