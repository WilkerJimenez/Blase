/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 100ms',
        slideOut: 'slideOut 100ms',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: 0,
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        slideOut: {
          '0%': {
            opacity: 1,
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: 0,
            transform: 'translateY(100%)',
          },
        },
      },
      fontFamily: {
        text: ['Nunito'],
        textShow: ['Gabarito'],
      },
    },
  },
  plugins: [],
}
