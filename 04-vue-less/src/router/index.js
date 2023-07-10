import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/less',
    name: 'lessView',
    component:()=>import('@/views/LessView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
