/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      login: '#fcbc8a',
      signup: '#6cb3c0',
      input: '#e5e5e5',
      primary: '#2f2f2f',
      whitereal: '#fcfcfc',
      red: '#fa7070',
      yellow: '#FFC045',
      green: '#03C988',
      blue: '#33CCFF',
      black: '#000',
      main: '#27374d',
      sub: '#9DB2BF',
      header: '#526D82',
      white: '#DDE6ED'
    },
    borderRadius: {
      primary: '20px',
      second: '10px'
    },
    extend: {}
  },
  plugins: []
}
