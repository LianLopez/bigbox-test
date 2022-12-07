/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6C5E",
        },
        gray: {
          1: "#464646",
          4: "#BDBDBD",
        },
      },
    },
  },
  plugins: [],
};
