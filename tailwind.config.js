const { violet, blackA, mauve, green, gray } = require("@radix-ui/colors");
/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./App.jsx"],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "300px",
        md: "600px",
        lg: "800px",
        xl: "1000px",
      },
    },
    screens: {
      sm: "300px",
      md: "600px",
      lg: "800px",
      xl: "1000px",
    },
    extend: {
      colors: {
        ...mauve,
        ...violet,
        ...green,
        ...blackA,
        ...gray,
      },
      keyframes: {
        overlayShow: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        contentShow: {
          from: {
            opacity: "0",
            transform: "translate(-50%, -48%) scale(0.96)",
          },
          to: { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        overlayShow: "overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
        contentShow: "contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
    colors: {
      "main-purple": "#635fc7",
      "main-purple-hover": "#a8a4ff",
      white: "#FFFFFF",
      black: "#000112",
      "dark-grey": " #2B2C37",
      "very-dark-grey": "#1e1e1e",
      lines: "#3E3F4E",
      "medium-grey": "#828FA3",
      "lines-light": "#E4EBFA",
      "light-grey": " #F4F7FD",
      red: "#EA5555",
      "red-hover": "#ff9898",
    },
    fontFamily: {
      jakatra: ["Plus Jakarta Sans", "serif"],
    },
    fontSize: {
      "heading-s": [".75rem", { fontWeight: "700" }],
      "heading-m": [".9rem", { fontWeight: "700" }],
      "heading-l": ["1.125rem", { fontWeight: "700" }],
      "heading-xl": ["1.5rem", { fontWeight: "700" }],
      "body-m": [".75rem", { fontWeight: "700" }],
      "body-l": [".8125rem", { fontWeight: "500" }],
    },
  },
  plugins: [],
};
