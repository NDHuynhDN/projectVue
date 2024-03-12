/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      login: '#fcbc8a',
      signup: '#a4dbe6',
      input: '#e5e5e5',
      primary: '#2f2f2f',
      white: '#ececec',
      whitereal: '#ffffff',
      red: '#fa7070',
      yellow: '#c4cf51',
      green: '#54f542',
      blue: '#33CCFF'
    },
    borderRadius: {
      primary: '20px',
      second: '10px'
    },
    extend: {}
  },
  plugins: []
}
