/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        navyBlue: '#01257D',
        electricBlue: '#00FFFF'
      },
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
        'lato': ['Lato', 'sans-serif'],
        // Add more custom fonts as needed
      },
    },
  },
  plugins: [],
}

