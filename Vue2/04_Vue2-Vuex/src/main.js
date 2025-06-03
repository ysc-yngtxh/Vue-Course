import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './plugins/element'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  ElementPlus,
  render: h => h(App)
}).$mount('#app')
