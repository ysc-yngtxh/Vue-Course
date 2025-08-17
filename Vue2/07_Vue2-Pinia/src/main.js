import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
// 引入pinia
import { createPinia, PiniaVuePlugin } from 'pinia'
Vue.use(PiniaVuePlugin)
const pinia = createPinia() // 需要挂载在实例上

Vue.config.productionTip = false

new Vue({
    router,
    pinia,
    render: h => h(App)
}).$mount('#app')
