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
  },
  {
    path: '/checkout-counter/:type',
    name: 'checkout-counter',
    component: () => import('@/views/market/checkoutCounter.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '結賬'
    }
  },
  {
    path: '/market/nfts',
    name: 'market-nfts',
    component: () => import('@/views/market/nfts.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  }
]

export default market
