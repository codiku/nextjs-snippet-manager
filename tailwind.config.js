/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          900: "#0A0B0F",
          800: "#141519",
          700: "#1A1B1F",
          600: "#2E2F34",
          500: "#404145",
          400: "#525357",
          300: "#646569",
          200: "#76777C",
          100: "#88898D",
          50: "#AAAAAF",
        },
      },
    },
  },
};
