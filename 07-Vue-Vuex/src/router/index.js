import {createRouter, createWebHashHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/state',
    name: 'state',
    component: () => import( '../views/StateView.vue')
  },
  {
    path: '/getter',
    name: 'getter',
    component: () => import( '../views/GetterView.vue')
  },
  {
    path: '/mutation',
    name: 'mutation',
    component: () => import( '../views/MutationView.vue')
  },
  {
    path: '/action',
    name: 'action',
    component: () => import( '../views/ActionView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
