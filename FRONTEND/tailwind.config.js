/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts}"],
  theme: {
    extend: {
      animation: {
        slideIn: 'slideIn 100ms',
        slideOut: 'slideOut 100ms',
        fadeIn: 'fadeIn 300ms',
        rightSlide: 'rightSlide 200ms',
        rightSlideOut: 'rightSlideOut 200ms',
      },
      keyframes: {
        slideIn: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideOut: {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(100%)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
            filter: 'blur(5px)',
          },
          '100%': {
            opacity: '1',
            filter: 'blur(0)',
          },
        },
        rightSlide: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          }
        },
        rightSlideOut: {
          '100%': {
            transform: 'translateX(100%)',
          }
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
