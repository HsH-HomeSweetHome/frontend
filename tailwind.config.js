/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Vite의 진입점 HTML
    "./src/**/*.{js,ts,jsx,tsx}", // src 내부 모든 js, ts, jsx, tsx 포함
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
