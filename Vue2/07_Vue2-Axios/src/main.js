import Vue from 'vue'
import '@/plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import setupElementUI from "@/plugins/element"; // 引入 Element UI 配置
import axios from "@/plugins/axios";

// 初始化 Element UI
setupElementUI()

// 将 axios 挂载到 Vue 原型上，这样在任何组件中都可以通过 this.$axios 访问
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
