/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        transitionProperty: {
          'max-height': 'max-height'
        },
        animation: {
          'slide': 'slide 10s linear infinite'
        },
        keyframes:{
          slide: {
            '0%': { transform: 'translateX(100%)' },
            '100%': { transform: 'translateX(-100%)' },
          }
        }


    },
    fontFamily: {
      fairDisplay: ['Playfair Display', 'serif'],
      inter: ['Inter', 'sans-serif'],
      rightGrotesk: ['Right Grotesk', 'sans-serif'],
      geist:['Geist', 'sans-serif']
    }
  },
  plugins: [],
}

