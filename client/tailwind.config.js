/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'status-completed': '#059669', // Custom green
        'status-pending': '#e53e3e',   // Custom red
        'header-bg': '#3b82f6',        // Custom blue
      },
    },
  },
  plugins: [],
};
