/** @type {import('tailwindcss').Config} */
module.exports = {
  // `tw-` prefix + disabled preflight/container so Tailwind can coexist with the
  // existing Bootstrap/SCSS theme on the live portfolio without any class
  // collisions. Once Bootstrap is removed (portfolio restyle phase) the prefix
  // and these overrides can be dropped.
  prefix: "tw-",
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/content/**/*.{js,ts}",
  ],
  corePlugins: {
    preflight: false,
    container: false,
  },
  theme: {
    extend: {
      colors: {
        resume: {
          primary: "#4DA6BD",
          secondary: "#0F4C5C",
        },
      },
      fontFamily: {
        resume: ['"Roboto"', '"Helvetica"', '"Arial"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
