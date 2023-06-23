/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}', 'node_modules/preline/dist/*.js'],
  theme: {
    extend: {}
  },
  plugins: [require('preline/plugin')]
}
