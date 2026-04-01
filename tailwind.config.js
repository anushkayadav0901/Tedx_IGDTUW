/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'ted-red': '#ff0000',
        'ted-red-hover': '#cc0000',
        'pure-black': '#000000',
      },
      fontFamily: {
        'heading': ['Space Grotesk', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
