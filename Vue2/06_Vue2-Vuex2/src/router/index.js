import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

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

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

