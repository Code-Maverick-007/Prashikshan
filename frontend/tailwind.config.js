/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
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
      colors: {
        'primary': {
          DEFAULT: '#4F46E5', '50': '#EEF2FF', '100': '#E0E7FF', '200': '#C7D2FE', '300': '#A5B4FC', '400': '#818CF8', '500': '#6366F1', '600': '#4F46E5', '700': '#4338CA', '800': '#3730A3', '900': '#312E81',
        },
        'accent': {
          DEFAULT: '#00C4CC', 'light': '#60fffe', 'dark': '#05919b',
        },
        'bg': '#F7F8FC',
        'surface': '#FFFFFF',
        'text': '#111827',
        'text-secondary': '#6B7280',
        'border': '#E5E7EB',
        'dark-bg': '#0D1117',
        'dark-surface': '#161B22',
        'dark-text': '#E6EDF3',
        'dark-text-secondary': '#8D96A0',
        'dark-border': '#30363D',
        'success': '#10B981',
        'warning': '#F59E0B',
        'danger': '#EF4444',
      },
    },
  },
  plugins: [],
};