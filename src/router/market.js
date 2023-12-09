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
  },
  {
    path: '/market/raffle',
    name: 'market-raffle',
    component: () => import('@/views/market/raffle.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '抽奖'
    }
  },
  {
    path: '/market/invite-buy-package',
    name: 'market-invite-buy-package',
    component: () => import('@/views/market/inviteBuyPackage.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '購買配套'
    }
  }
]

export default market
