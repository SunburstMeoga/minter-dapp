import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue')
    },
    {
      path: '/static',
      name: 'static',
      component: () => import('@/views/StaticGains.vue')
    },
    {
      path: '/trends',
      name: 'trends',
      component: () => import('@/views/TrendsGains.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue')
    },
    {
      path: '/reward',
      name: 'reward',
      component: () => import('@/views/Reward.vue')
    },
    {
      path: '/principal',
      name: 'principal',
      component: () => import('@/views/PrincipalView.vue')
    },
  ]
})

export default router

