/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        spartan: ['"League Spartan"', 'sans-serif'],
      },
      fontSize: {
        'xxs': '7px',
      },
      backgroundImage: {
        'hero-lg': "url('/assets/herobg.jpg')", // <-- this enables `lg:bg-hero-lg`
      },
    },
  },
  plugins: [],
}
