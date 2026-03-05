export const typography = {
  fonts: {
    heading: 'var(--font-dongle)',
    body: 'var(--font-gabarito)',
  },

  sizes: {
    'display-xl': 'clamp(3.5rem, 8vw, 7rem)',
    'display-lg': 'clamp(3rem, 6vw, 5.5rem)',
    'display-md': 'clamp(2.5rem, 5vw, 4.5rem)',
    'heading-lg': 'clamp(2rem, 4vw, 3.5rem)',
    'heading-md': 'clamp(1.75rem, 3vw, 2.75rem)',
    'heading-sm': 'clamp(1.5rem, 2.5vw, 2.25rem)',
    'body-lg': '1.25rem',
    'body-md': '1.125rem',
    'body-sm': '1rem',
    caption: '0.875rem',
  },

  lineHeight: {
    tight: '1.1',
    snug: '1.25',
    normal: '1.5',
    relaxed: '1.75',
  },
} as const
