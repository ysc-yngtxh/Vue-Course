import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AsideComponent from '@/components/AsideComponent.vue'
import NavComponent from '@/components/NavComponent.vue'
import VideoPath from '@/components/children/VideoPath.vue'
import TextPath from '@/components/children/TextPath.vue'
import ImagePath from '@/components/children/ImagePath.vue'

// 在Vue上注册 VueRouter 插件。Vue2使用 VueRouter，Vue3写法是使用 createRouter
// 作用：
//    1、注册全局组件（如 <router-link> 和 <router-view>）。
//    2、添加 $router 和 $route 属性，使得所有组件可以通过 this.$router 和 this.$route 访问路由实例和当前路由信息。
// 需知：虽然注册VueRouter插件能访问 this.$router，但没有实际的路由实例，比如调用 this.$router.push() 就会报错。
//      原因在于 VueRouter 插件只是提供了路由功能的接口和方法，并不直接管理路由实例，调用 push() 等方法时是无法感知到具体路由实例的。
//      因此就需要在 main.js 文件中将配置好的 VueRouter 实例注入到 Vue实例，这样绑定具体路由实例到应用，就能正常使用路由功能。
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        components: {
            AsideComponent,
            NavComponent,
            // 当存在多个组件时，有必要指定默认组件。否则 Vue Router 无法判断哪个为默认组件。
            default: HomeView   // 默认组件，用以对应没有name属性的 <router-view/>。
        }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    },
    // 重定向
    {
        path: '/a',
        // redirect: "/about"
        redirect: (to) => {
            console.log(to);
            // query 表示URL的查询参数（即 ?key=value 部分）
            if (to.query.go === 'About') { // 如果 /a?go=About，则重定向到About页面
                return {name: "About"}
            } else {
                return {name: "Me", params: {id: 45654}}
            }
        }
    },
    {
        path: '/alias',
        name: 'Alias',
        // 别名：就是浏览器地址栏上的uri地址是 '/alias' 还是 '/self' 表示的都是同一个页面
        alias: '/self',
        component: () => import(/* webpackChunkName: "news" */ '../views/AliasView.vue')
    },
    {
        path: '/me/:id',
        name: 'Me',
        component: () => import(/* webpackChunkName: "me" */ '../views/MeView.vue')
    },
    {
        path: '/assignment/:id',
        name: 'Assignment',
        // props设置为true，那么 $route.params 将会被设置为组件属性，为已知的属性数据
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
                name: 'VideoPath', // 建议为子路由添加name
                component: VideoPath
            },
            {
                path: 'text',
                name: 'TextPath',
                component: TextPath
            },
            {
                path: 'image',
                name: 'ImagePath',
                component: ImagePath
            }
        ]
    }
]


const router = new VueRouter({
    mode: 'history', // 或 'hash'
    routes
})

export default router
