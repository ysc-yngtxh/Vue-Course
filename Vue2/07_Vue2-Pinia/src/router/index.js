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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/pinia1',
    name: 'pinia1',
    // route level code-splitting
    // this generates a separate chunk (new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/PiniaView1.vue')
  },
  {
    path: '/pinia2',
    name: 'pinia2',
    // route level code-splitting
    // this generates a separate chunk (new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/PiniaView2.vue')
  },
  {
    path: '/pinia3',
    name: 'pinia3',
    // route level code-splitting
    // this generates a separate chunk (new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/PiniaView3.vue')
  },
  {
    path: '/pinia4',
    name: 'pinia4',
    // route level code-splitting
    // this generates a separate chunk (new.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "new" */ '../views/PiniaView4.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
