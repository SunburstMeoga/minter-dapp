import { createRouter, createWebHistory } from 'vue-router'
import home from './home'
import recommend from './recommend'
import coherent from './coherent'
import earnings from './earnings'
import personal from './personal'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...home,
    ...recommend,
    ...coherent,
    ...earnings,
    ...personal
  ]
})

export default router

