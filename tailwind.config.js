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
        'cactus': '#BADB2B',
        'cactus2': '#a7c427'
      },
      borderColor: theme => ({
        ...theme('colors'),
      })
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: "#BADB2B",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        },
        dark: {
          colors: {
            primary: {
              DEFAULT: "#BADB2B",
              foreground: "#000000",
            },
            focus: "#BEF264",
          },
        }
      },
    }),
  ],
};