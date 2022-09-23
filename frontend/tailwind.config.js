/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui' ],
      'serif': ['ui-serif', 'Georgia' ],
      'Bungee': [ 'Bungee Spice', 'cursive'],
      'poppins':['Poppins', 'sans-serif'],
      
    },
    extend: {},
  },
  plugins: [],
}