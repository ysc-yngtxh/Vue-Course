import {defineStore} from 'pinia' // 引入

// TODO 注意：使用 Vue2 版本对应的 Pinia，应使用其 Pinia2.x.x

const useStore = defineStore('storeId', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
        }
    },
    // 相当于 vue 中的 computed 计算属性
    getters: {},
    // 相当于 vue 中的 methods 方法
    actions: {
        increment() {
            this.counter++
        }
    }
})
export default useStore // 导出