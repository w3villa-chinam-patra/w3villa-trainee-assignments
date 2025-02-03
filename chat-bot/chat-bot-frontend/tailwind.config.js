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
        "chat-background": "url('/images/background.png')",
      }
    },
  },
  plugins: [],
}

