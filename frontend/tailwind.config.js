/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3faf7',
          100: '#d8f2e7',
          300: '#7dd9b2',
          500: '#20b07e',
          700: '#0d6d50',
          900: '#07372a'
        }
      }
    }
  },
  plugins: []
};
