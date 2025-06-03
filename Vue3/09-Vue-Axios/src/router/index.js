import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/table',
    name: 'table',
    component: () => import('../views/TableView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
