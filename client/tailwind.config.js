/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {
      colors: {
        woodsmoke: {
          50: '#F0F0F0',
          100: '#E3E3E3',
          200: '#C4C4C4',
          300: '#A8A8A8',
          400: '#8A8A8A',
          500: '#6D6D6D',
          600: '#575757',
          700: '#424242',
          800: '#2B2B2B',
          900: '#171717',
          950: '#0A0A0A'
        }
      }
    }
  },
  plugins: [require('preline/plugin')]
}
