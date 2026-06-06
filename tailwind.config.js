/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#04080F',
          900: '#080F17',
          800: '#0D1B2A',
          700: '#122236',
          600: '#1A3047',
        },
        amber: {
          400: '#F5A623',
          300: '#FAC75A',
        },
        cyan: {
          400: '#7FFFD4',
          300: '#A8FFE5',
        }
      },
      fontFamily: {
        display: ['"Sora"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
