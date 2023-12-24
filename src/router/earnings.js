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
      showLogo: true,
      showBack: false,
      pageTitle: '操作记录'
    }
  },
  // {
  //   path: '/earnings/operation-record',
  //   name: 'poeration-record',
  //   component: () => import('@/views/earnings/operationRecord.vue'),
  //   meta: {
  //     showLogo: true,
  //     showBack: false,
  //     pageTitle: '操作记录'
  //   }
  // }
]

export default earnings
