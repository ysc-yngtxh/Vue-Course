import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
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
        meta: { requiredAuth: true, isAuth: false },
        // about路由独享守卫： 就只针对about路由进行导航守卫
        beforeEnter: (to, from, next) => {
            console.log('/about独享事件')
            if (to.meta.requiredAuth || to.path === '/login') {
                next()
            } else {
                next('login')
            }
        }
    },
    {
        path: '/param/:id',
        name: 'ParamView',
        component: () => import('@/views/ParamView.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
    console.log('全局前置守卫被触发-----------')
    console.log(from, to)
    // 模拟登录拦截处理结果，为true表示放行；false拦截
    const number = Math.floor(Math.random() * 2)
    let isLogin = true
    if (number === 1) {
        isLogin = true
    }
    console.log(number)
    if (isLogin) {
        next()
    } else {
        // 当 isLogin 不为true时，next()中的参数为下一次to的路由路径，而我们在进入to的路径时候，又会触发全局前置守卫，进而循环执行。
        // next()方法本身是没有循环的效果，只是全局前置守卫的特性所决定在每一次跳转路径时候会触发执行
        // next({ path: '/about' })

        // 路由直接跳转到 /about 路径
        // router.push('/about')
        router.push('/param/1')
    }
})

// 全局解析守卫,所有组件内守卫和异步路由守卫组件被解析之后触发
router.beforeResolve((to, from, next) => {
    console.log('全局解析守卫被触发-------------')
    next()
})

// 全局后置守卫: 路由跳转完成后触发
router.afterEach((to, from) => {
    console.log('全局后置守卫被触发-------------')
    console.log(to, from)
})

// 全局错误守卫
router.onError((err) => {
    console.log('全局错误守卫被触发-------------')
    console.log(err)
})

export default router
