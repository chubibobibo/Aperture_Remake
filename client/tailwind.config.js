import withMT from "@material-tailwind/react/utils/withMT";
/** @type {import('tailwindcss').Config} */

export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontfamily: {
        lato: ["Lato", "sans-serif"],
      },
      colors: {
        logoBlack: {
          50: "#241f1f",
        },
        landingGray: {
          50: "#2e2f30",
        },
      },
      screens: {
        "sm-max": { max: "720px" },
      },
    },
  },
  plugins: [],
});
