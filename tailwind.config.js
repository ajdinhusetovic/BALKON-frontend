/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        "white-color": "#fdfffc",
        "light-blue": "#2ec4b6",
        "light-brown-color": "#dda15e",
        "dark-brown-color": "#bc6c25",
        "red-color": "#e71d36",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
  daisyui: {
    base: false,
    darkTheme: "light",
  },
};
