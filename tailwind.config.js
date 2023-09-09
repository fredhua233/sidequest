/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      backgroundImage:{
        'ufc': "url(./image/games/ufc.png)",
        'fifa': "url(./image/games/fifa.png)",
        '2k': "url(./image/games/2k.png)",
        'madden': "url(./image/games/madden.png)",
      }
    },
  },
  plugins: [require('@tailwindcss/forms'),require("tw-elements/dist/plugin")],
}

