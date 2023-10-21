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
      showLogo: true,
      showBack: false
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
  }
]

export default personal
