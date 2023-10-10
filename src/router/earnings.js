let earnings = [
  {
    path: '/earnings',
    name: 'earnings',
    component: () => import('@/views/earnings/index.vue'),
    meta: {
      showLogo: true,
      showBack: false
    }
  },
  {
    path: '/earnings/list',
    name: 'earnings-list',
    component: () => import('@/views/earnings/list.vue'),
    meta: {
      showLogo: false,
      showBack: true,
      pageTitle: '收益明细'
    }
  },
]

export default earnings