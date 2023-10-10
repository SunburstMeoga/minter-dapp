let personal = [
    {
      path: '/personal',
      name: 'personal',
      component: () => import('@/views/personal/index.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    }
  ]
  
  export default personal