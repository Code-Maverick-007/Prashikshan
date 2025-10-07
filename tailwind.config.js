/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6fffe',
          100: '#cdfffe',
          200: '#a1fffe',
          300: '#60fffe',
          400: '#18f2f5',
          500: '#00c4cc',
          600: '#00b8c2',
          700: '#05919b',
          800: '#0d747d',
          900: '#106069',
        },
        gray: {
          850: '#1f2937',
          950: '#0d1117',
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'progress-fill': 'progressFill 2s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        progressFill: {
          '0%': { strokeDasharray: '0 251.2' },
          '100%': { strokeDasharray: 'var(--progress) 251.2' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 196, 204, 0.3)',
        'glow-lg': '0 0 40px rgba(0, 196, 204, 0.2)',
      },
    },
  },
  plugins: [],
};