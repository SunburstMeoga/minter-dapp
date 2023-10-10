module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': '#eaae36',
        'secondary-color': '#4b2b7a',
        'secondary-icon': '#A3A0BA',
        'card-content': '#2a3035',
        'card-word': '#a3a3a3',
        'gray-700': '#334155'
      }
    }
  },
  variants: {
    extend: {
     
    }
  },
  plugins: []
}
