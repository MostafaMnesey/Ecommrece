/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",

    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        main: "rgb(10, 173, 10, 0.8)",
      },
      fontFamily: {
        'open-sans': ["Open Sans","sans-serif"],
        'saira-condensed':['"Saira Condensed", serif']
      },
    },
  },
  plugins: [flowbite.plugin()],
};
