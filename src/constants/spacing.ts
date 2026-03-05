export const spacing = {
  section: {
    y: 'py-24 md:py-32 lg:py-40',
    x: 'px-6 md:px-12 lg:px-20',
  },

  container: 'max-w-7xl mx-auto',

  gap: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
    '3xl': '6rem',
  },
} as const

export const motion = {
  duration: {
    fast: 200,
    medium: 400,
    slow: 600,
  },

  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    spring: [0.34, 1.56, 0.64, 1] as const,
  },

  stagger: {
    fast: 0.05,
    medium: 0.1,
  },
} as const
