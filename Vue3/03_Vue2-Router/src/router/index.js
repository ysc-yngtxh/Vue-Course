import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/HomeView.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import VideoPath from '@/components/children/VideoPath.vue'
import TextPath from '@/components/children/TextPath.vue'
import ImagePath from '@/components/children/ImagePath.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        components: {
            AsideComponent,
            NavComponent,
            default: Home,
        }
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    // 重定向
    {
        path: '/a',
        // redirect: "/about"
        redirect: (to) => {
            console.log(to);
            if (to.query.go === 'About') {
                return {name: "About"}
            } else {
                return {name: "Me", params: {id: 45654}}
            }
        }
    },
    {
        path: '/news',
        name: 'News',
        // 别名：就是浏览器地址栏上的uri地址是 '/news' 还是 '/self' 表示的都是同一个页面
        alias: '/self',
        component: () => import(/* webpackChunkName: "news" */ '../views/NewsView.vue')
    },
    {
        path: '/me/:id',
        name: 'Me',
        component: () => import(/* webpackChunkName: "me" */ '../views/MeView.vue')
    },
    {
        path: '/assignment/:id',
        name: 'Assignment',
        // props设置为true,那么$route.params将会被设置为组件属性，为已知的属性数据
        props: true,
        component: () => import(/* webpackChunkName: "assignment" */ '../views/AssignmentView.vue')
    },
    {
        path: '/staticValue/:id',
        name: 'StaticValue',
        props: ($route) => {
            console.log($route)
            return {
                id: $route.params.id,
                username: "我是如来佛祖玉皇大帝观音菩萨指定取西经特派使者花果山水帘洞齐天大圣孙悟空啊"
            }
        },
        component: () => import(/* webpackChunkName: "staticValue" */ '../views/StaticValueView.vue')
    },
    {
        path: '/nestedPath',
        name: 'NestedPath',
        component: () => import(/* webpackChunkName: "nestedPath" */ '../views/NestedPathView.vue'),
        children: [
            {
                path: 'video',
                component: VideoPath
            },
            {
                path: 'text',
                component: TextPath
            },
            {
                path: 'image',
                component: ImagePath
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),  // 如果使用createWebHashHistory(),该项目路径中含有 /#/
    routes
})

export default router
