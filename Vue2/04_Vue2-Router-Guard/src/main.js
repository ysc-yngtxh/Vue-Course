import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import setupVuetifyUI from "./plugins/vuetify";
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

// setupVuetifyUI();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
