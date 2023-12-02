/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}"
  ],
  variants: {
    extend: {
      borderColor: ['focus-within', 'focus'],
    }
  },
  theme: {
    extend: {},
    fontFamily: {
      text: ['Nunito'],
      textShow: ['Gabarito'],
    },
  },
  plugins: [],
}

