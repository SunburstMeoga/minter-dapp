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
      component: () => import('@/views/HomeView.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    },
    {
      path: '/static',
      name: 'static',
      component: () => import('@/views/StaticGains.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    },
    {
      path: '/trends',
      name: 'trends',
      component: () => import('@/views/TrendsGains.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('@/views/UserView.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    },
    {
      path: '/reward',
      name: 'reward',
      component: () => import('@/views/Reward.vue'),
      meta: {
        showLogo: false,
        showBack: true,
        pageTitle: '收益明细'
      }
    },
    {
      path: '/principal',
      name: 'principal',
      component: () => import('@/views/PrincipalView.vue'),
      meta: {
        showLogo: true,
        showBack: false
      }
    },
  ]
})

export default router

