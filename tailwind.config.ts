import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        marine: {
          900: '#052C3E',
          800: '#0A3B58',
          700: '#0E4C73',
          600: '#136189',
          500: '#1878A8',
          400: '#3C93C2',
        },
        celeste: {
          500: '#4FB8E8',
          400: '#7CD0F5',
          300: '#A9E2FA',
          200: '#D6F0FB',
        },
        foam: '#F4FAFD',
        eco: {
          600: '#1F8A6E',
          500: '#2EA37E',
          400: '#4CBB94',
        },
      },
      fontFamily: {
        sans: ['ui-sans-serif', 'system-ui', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        card: '0 6px 24px -8px rgba(10, 59, 88, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
