import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setupElementUI from "@/plugins/element"; // 引入 Element UI 配置

// 初始化 Element UI
setupElementUI()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
