/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans your src folder for JS/JSX/TS/TSX files
    "./public/index.html", // Ensures Tailwind also scans your HTML file
  ],
  theme: {
    extend: {}, // Empty for now, but you can add customizations later if needed
  },
  plugins: [],
}
