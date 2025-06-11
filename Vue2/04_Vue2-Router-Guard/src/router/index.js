import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            alias: '/login',
            name: 'Home',
            component: HomeView,
            // 路由元信息
            meta: {
                context: '首页',
                isAuth: true
            }
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('../views/AboutView.vue'),
            // 路由元信息
            meta: {requiredAuth: true, isAuth: false},
            // about路由独享守卫： 就只针对about路由进行导航守卫
            beforeEnter: (to, from, next) => {
                console.log('/about独享事件');
                if (to.meta.requiredAuth || to.path === '/login') {
                    next();
                } else {
                    next('login');
                }
            }
        },
        {
            path: '/param/:id',
            name: 'ParamView',
            component: () => import('@/views/ParamView.vue')
        }
    ]
})

export default router
