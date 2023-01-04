/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        semi: "rgba(0,0,0,0.5)",
        charcoal: "#2F2F2F",
        kellygreen: "#56C500",
        silver: "#D0D0D0",
        darksilver: "#A0A0A0",
        warning: "#f7c600",
        failed: "#ef513a",
        successful: "#3dc13c"
      },
    },
  },
  plugins: [],
}
