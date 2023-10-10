let home = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
        meta: {
            showLogo: true,
            showBack: false
          }
    }
]

export default home