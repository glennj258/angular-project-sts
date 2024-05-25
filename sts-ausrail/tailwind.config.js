/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        hg: ['Hanken Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif']
    },},
  },
  plugins: [],
  
}