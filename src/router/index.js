import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import recommend from './recommend'
import coherent from './coherent'
import earnings from './earnings'
import personal from './personal'
import market from './market'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    // ...home,
    // ...recommend,
    // ...coherent,
    // ...earnings,
    // ...personal,
    // ...market
  ]
})

export default router

