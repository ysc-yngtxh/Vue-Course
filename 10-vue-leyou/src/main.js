import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from "vue-axios";
import installElementPlus from './plugins/element'
import store from './store'
import vuetify from './plugins/vuetify'
import VueParticles from 'vue-particles'  // 动态粒子开发依赖
import * as echarts from 'echarts';       // 数据可视化图层
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(store).use(vuetify).use(installElementPlus).use(router).use(VueParticles).mount('#app')

app.config.globalProperties.$echarts = echarts
