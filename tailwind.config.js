/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
  ],
  theme: {
    extend: {
      colors: {
        "includo-sky": "#00719c"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        includo: {
          "primary": "#00719c",
          "secondary": "#92567C",
          "accent": "#384955",
          "neutral": "#9BAEBC",
          "base-100": "#ffffff",
        },
      },
    ]
  }
}

