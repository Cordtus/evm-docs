// tailwind.config.mjs
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './content/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './mdx-components.tsx',
    './theme.config.tsx',
  ],
  safelist: ['text-orange-600'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Standard orange palette
        orange: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          200: '#FED7AA',
          300: '#FDBA74',
          400: '#FB923C',
          500: '#F97316',
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12',
          950: '#431407',
        },
        // Cosmos-specific color palette
        cosmos: {
          orange: {
            50: '#FFF7ED',
            100: '#FFEDD5',
            200: '#FED7AA',
            300: '#FDBA74',
            400: '#FB923C',
            500: '#F97316',
            600: '#EA580C',
            700: '#C2410C',
            800: '#9A3412',
            900: '#7C2D12',
            950: '#431407',
          },
          amber: {
            50: '#FFFBEB',
            100: '#FEF3C7',
            200: '#FDE68A',
            300: '#FCD34D',
            400: '#FBBF24',
            500: '#F59E0B',
            600: '#D97706',
            700: '#B45309',
            800: '#92400E',
            900: '#78350F',
            950: '#451A03',
          },
          purple: {
            50: '#F5F3FF',
            100: '#EDE9FE',
            200: '#DDD6FE',
            300: '#C4B5FD',
            400: '#A78BFA',
            500: '#8B5CF6',
            600: '#7C3AED',
            700: '#6D28D9',
            800: '#5B21B6',
            900: '#4C1D95',
            950: '#2E1065',
          },
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            code: {
              fontWeight: 'normal',
              backgroundColor: theme('colors.gray.100'),
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontFamily: theme('fontFamily.mono'),
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.white'),
              fontFamily: theme('fontFamily.mono'),
            },
            a: {
              color: theme('colors.cosmos.orange.600'),
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              fontWeight: 600,
            },
            h2: {
              fontWeight: 600,
            },
            h3: {
              fontWeight: 600,
            },
            h4: {
              fontWeight: 600,
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.cosmos.orange.400'),
            },
            code: {
              backgroundColor: theme('colors.gray.800'),
            },
            h1: {
              color: theme('colors.white'),
            },
            h2: {
              color: theme('colors.white'),
            },
            h3: {
              color: theme('colors.white'),
            },
            h4: {
              color: theme('colors.white'),
            },
          },
        },
      }),
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        cosmos: '0 0 15px 2px rgba(249, 115, 22, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cosmos-glow': 'radial-gradient(circle at center, rgba(249, 115, 22, 0.15), transparent 70%)',
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default tailwindConfig;
