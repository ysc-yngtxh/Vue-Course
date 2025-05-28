import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from './plugins/element'

const app = createApp(App)
ElementPlus(app)
app.use(store).use(router).mount('#app')