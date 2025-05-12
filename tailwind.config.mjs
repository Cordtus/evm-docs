import typography from '@tailwindcss/typography';
import colors from 'tailwindcss/colors.js';

/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './app/**/*.{js,jsx,ts,tsx,md,mdx}',
    './content/**/*.{js,jsx,ts,tsx,md,mdx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './mdx-components.tsx',
    './theme.config.tsx'
  ],
  safelist: [
    'bg-blue-50', 'bg-amber-50', 'bg-red-50', 'bg-purple-50', // callout colours
    'text-orange-50','text-orange-100','text-orange-200','text-orange-300',
    'text-orange-400','text-orange-500','text-orange-600','text-orange-700',
    'text-orange-800','text-orange-900',
    'bg-orange-50','bg-orange-100','bg-orange-200','bg-orange-300',
    'bg-orange-400','bg-orange-500','bg-orange-600','bg-orange-700',
    'bg-orange-800','bg-orange-900',
    'border-orange-500','border-orange-600'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* restore default palettes used in globals.css */
        blue:   colors.blue,
        amber:  colors.amber,
        red:    colors.red,
        purple: colors.purple,

        /* custom orange override */
        orange: {
          ...colors.orange,
          50:'#FFF7ED',100:'#FFEDD5',200:'#FED7AA',300:'#FDBA74',
          400:'#FB923C',500:'#F97316',600:'#EA580C',
          700:'#C2410C',800:'#9A3412',900:'#7C2D12',950:'#431407'
        },

        /* cosmos palettes (unchanged) */
        cosmos: { /* … your existing cosmos.orange / amber / purple … */ }
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace']
      },
      animation: { 'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite' },
      boxShadow: { cosmos:'0 0 15px 2px rgba(249,115,22,0.3)' },
      backgroundImage: {
        'gradient-radial':'radial-gradient(var(--tw-gradient-stops))',
        'cosmos-glow':'radial-gradient(circle at center,rgba(249,115,22,.15),transparent 70%)'
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code::before':{content:'""'},
            'code::after': {content:'""'},
            code:{
              fontWeight:'normal',
              backgroundColor:theme('colors.gray.100'),
              padding:'0.2em 0.4em',
              borderRadius:'0.25rem',
              fontFamily:theme('fontFamily.mono')
            },
            pre:{
              backgroundColor:theme('colors.gray.800'),
              color:theme('colors.white'),
              fontFamily:theme('fontFamily.mono')
            },
            a:{
              color:theme('colors.cosmos.orange.600'),
              textDecoration:'none',
              '&:hover':{textDecoration:'underline'}
            }
          }
        },
        dark:{
          css:{
            color:theme('colors.gray.300'),
            a:{color:theme('colors.cosmos.orange.400')},
            code:{backgroundColor:theme('colors.gray.800')}
          }
        }
      })
    }
  },
  plugins: [typography]
};

export default tailwindConfig;
