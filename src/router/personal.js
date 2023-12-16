let personal = [
  {
    path: '/personal',
    name: 'personal',
    component: () => import('@/views/personal/index.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  },
  {
    path: '/personal/wallet',
    name: 'personal-wallet',
    component: () => import('@/views/personal/wallet.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  },
  {
    path: '/personal/coherents',
    name: 'personal-coherents',
    component: () => import('@/views/personal/coherents.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '配套详情'
    }
  },
  {
    path: '/personal/promise-card',
    name: 'personal-promise-card',
    component: () => import('@/views/personal/promiseCard.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '承諾卡'
    }
  },
  {
    path: '/personal/nfts',
    name: 'personal-nfts',
    component: () => import('@/views/personal/nfts.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: 'NFTs'
    }
  },
  {
    path: '/personal/assistance',
    name: 'personal-assistance',
    component: () => import('@/views/personal/assistance.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  },
  {
    path: '/personal/exchange',
    name: 'personal-exchange',
    component: () => import('@/views/personal/exchange.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '兌換'
    }
  }
]

export default personal
