/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101510",
        panel: "#182019",
        lime: "#c6f36b",
      },
    },
  },
  plugins: [],
};