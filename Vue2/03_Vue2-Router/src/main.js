import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 当 Vue 运行在 开发环境 时，默认会在浏览器控制台输出一条提示："You are running Vue in development mode. Make sure to turn on production mode when deploying for production."
// 这是提醒开发者记得在生产环境部署时切换到 Vue 的生产模式
Vue.config.productionTip = false  // 这里关闭生产环境提示，避免不必要的控制台输出。

new Vue({
    router, // 将自定义的 Vue Router 实例注入 Vue，使整个应用支持路由功能（如 this.$router.push()）。
    store,  // 将自定义的 Vuex 实例注入 Vue，使所有组件能访问全局状态（如 this.$store.state）。
    // render 函数：Vue 通过虚拟 DOM 渲染组件，此函数返回根组件的虚拟节点。
    // h：是 createElement 的别名，用于创建虚拟 DOM 元素。
    // h(App)：表示渲染根组件 App.vue（通常是项目的顶层组件）。
    render: h => h(App)
}).$mount('#app')
