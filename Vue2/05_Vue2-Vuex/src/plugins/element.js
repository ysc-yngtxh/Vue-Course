import Vue from 'vue'
import ElementUI from 'element-ui'
// 可选：按需注册组件（如果需要）
// import { ElButton, ElSelect } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入 Element UI 样式

/**
 * 全局注册 Element UI
 */
export default function setupElementUI() {
    Vue.use(ElementUI)
    // Vue.use(ElButton)
    // Vue.use(ElSelect)

    // 可以在这里进行全局配置（可选）
    // Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
}

