/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
        transitionProperty: {
          'max-height': 'max-height'
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

