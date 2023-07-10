import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'RefView',
    component: () => import('@/views/RefView.vue')
  },
  {
    path: '/setup',
    name: 'SetupView',
    component: () => import('../views/SetupView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
