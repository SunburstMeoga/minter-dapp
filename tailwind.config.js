module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary-color': '#e149ed',
        // 粉紫CC6DED 蓝48A7FA 蓝紫2C4FB0 紫944CE0 深紫e149ed #e149ed
        'secondary-color': '#944CE0',
        'secondary-icon': '#2C4FB0',
        'card-content': '#2a3035',
        'card-word': '#a3a3a3',
        'gray-700': '#334155',
        'gray-card': '#171b29',
        'gray-bottom': '#2f323f',
        'menu-word': '#afafaf',
        'page-content': '#0F131C',
        'popup-cover': 'rgba(0, 0, 0, 0.8)',
        'card-cover': 'rgba(0, 0, 0, 0.4)',
        'nft-cover': 'rgba(243,232,255, 0.2)',
        'top-content': '#1c1832',
        'test-one': '#CC6DED',
        'test-two': '#48A7FA',
        'test-three': '#2C4FB0',
        'test-four': '#944CE0',
        'test-five': '#e149ed',
        'test-seven': '#e149ed',
        'slate-600': '#475569',
        'bottom-content': '#27272A'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
