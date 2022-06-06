/* eslint-disable no-undef */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-green": "#263e36", // color of logo's circle in dark mode
        "dark-blue": "#262e3e", // inverse color of above
        "line-green": "#03ac1d", // line color of chart in dark mode
        "line-blue": "#8884d8", // line color of chart in light mode
      },
    },
  },
  darkMode: "media",
  plugins: [],
};
