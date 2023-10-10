module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': '#eaae36',
        // 粉紫CC6DED 蓝48A7FA 蓝紫2C4FB0 紫944CE0 深紫2B2353
        'secondary-color': '#4b2b7a',
        'secondary-icon': '#A3A0BA',
        'card-content': '#2a3035',
        'card-word': '#a3a3a3',
        'gray-700': '#334155'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
