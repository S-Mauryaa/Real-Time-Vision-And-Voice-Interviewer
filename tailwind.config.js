/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8FA28A',
          dark: '#7A8F75',
          light: '#A3B59E',
        },
        secondary: {
          DEFAULT: '#C7D3CD',
          light: '#DDE6E1',
        },
        background: '#F7F4ED',
        accent: {
          DEFAULT: '#C8A96B',
          dark: '#B5944F',
          light: '#D9BF8A',
        },
        cream: {
          DEFAULT: '#F7F4ED',
          dark: '#EDEAE2',
        },
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        border: '#E5E1DA',
        text: {
          DEFAULT: '#1C1C1E',
          secondary: '#6B7280',
          muted: '#9CA3AF',
        },
        error: '#DC2626',
        success: '#16A34A',
        warning: '#D97706',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['48px', { lineHeight: '1.1', fontWeight: '600' }],
        'heading-1': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'heading-2': ['28px', { lineHeight: '1.3', fontWeight: '500' }],
        'heading-3': ['22px', { lineHeight: '1.4', fontWeight: '500' }],
        'heading-4': ['18px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['16px', { lineHeight: '1.6' }],
        'body': ['14px', { lineHeight: '1.6' }],
        'small': ['13px', { lineHeight: '1.5' }],
        'metric': ['36px', { lineHeight: '1.1', fontWeight: '600' }],
      },
      borderRadius: {
        'card': '12px',
        'card-lg': '16px',
        'card-sm': '8px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
        'dropdown': '0 4px 16px 0 rgba(0, 0, 0, 0.1)',
        'modal': '0 20px 60px 0 rgba(0, 0, 0, 0.15)',
        'topbar': '0 1px 0 0 #E5E1DA',
      },
      spacing: {
        'sidebar': '256px',
        'topbar': '64px',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'pulse-ring': 'pulseRing 1.5s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        'waveform': 'waveform 0.8s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.4)', opacity: '0' },
        },
        waveform: {
          '0%': { height: '4px' },
          '100%': { height: '20px' },
        },
      },
    },
  },
  plugins: [],
};
