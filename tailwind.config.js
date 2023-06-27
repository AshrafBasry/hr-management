/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F1F5FB",
          100: "#E3EBF7",
          200: "#C7D7F0",
          300: "#ABC2E8",
          400: "#8FAEE0",
          500: "#6590D5",
          600: "#3061AF",
          700: "#285192",
          800: "#204075",
          900: "#183058",
        },
        secondary: {
          50: "#F8F9F9",
          100: "#F1F2F4",
          200: "#E4E6E9",
          300: "#D6D9DE",
          400: "#C8CCD3",
          500: "#B3B9C2",
          600: "#848D9C",
          700: "#6B7585",
          800: "#565D6B",
          900: "#404650",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
