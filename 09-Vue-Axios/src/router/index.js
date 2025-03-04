import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/table1',
    name: 'table1',
    component: () => import('../views/Table1View.vue')
  },
  {
    path: '/table2',
    name: 'table2',
    component: () => import('../views/Table2View.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
