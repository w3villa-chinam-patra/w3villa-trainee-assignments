/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {

      },
      backgroundImage: {
        "chat-background": "url('./src/assets/images/background.png')",
      }
    },
  },
  plugins: [],
}

