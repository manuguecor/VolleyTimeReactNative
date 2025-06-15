/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "App.js"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'rasa-light': [ 'Rasa-VariableFont', 'sans-serif' ],
      }
    }
  },
  plugins: [],
}