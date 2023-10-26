// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    colors: {
      'darkestpink': '#fb6f92',
      'darkpink': '#ff8fab',
      'pink': '#ffb3c6',
      'lightpink': '#ffc2d1',
      'lightestpink': '#ffe5ec',
      'blue': '#89CFF0',
      'darkblue': '#1338BE'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
  ],
}

