let market = [
  {
    path: '/market',
    name: 'market',
    component: () => import('@/views/market/index.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  },
  {
    path: '/market/coherent',
    name: 'market-coherent',
    component: () => import('@/views/market/coherent.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  }
]

export default market
