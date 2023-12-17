// tailwind.config.js
const { nextui } = require("@nextui-org/react");
// import nextui from ''

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "##DB0101",
          foreground: "##DB0101",
        },
        focus: "##DB0101",
        'cactus': '#BADB2B',
      },
      borderColor: theme => ({
        ...theme('colors'),
      })
    }
  },
  darkMode: "class",
  plugins: [nextui()],
};