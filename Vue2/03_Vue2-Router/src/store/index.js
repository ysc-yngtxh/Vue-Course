import Vue from 'vue'
import Vuex from 'vuex'

// 在Vue上注册 Vuex 插件。Vue2 使用 Vuex，Vue3 的写法是使用 createStore
// 作用：启用状态管理能力（如 this.$store）。
// 注意：需要在 main.js 文件中将自定义的 Vuex 实例交给 Vue 实例进行管理，这样全局组件才能正常使用状态管理能力。
Vue.use(Vuex)

// 创建 Vuex Store
export default new Vuex.Store({
    state: {        // 存储数据
        count: 0,
        user: null
    },
    mutations: {    // 同步修改 state
        increment(state) {
            state.count++
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {      // 异步操作（如 API 请求）
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit('increment')
            }, 1000)
        },
        fetchUser({ commit }, userId) {
            return fetch(`/api/users/${userId}`)
                .then(res => res.json())
                .then(user => {
                    commit('setUser', user)
                })
        }
    },
    getters: {      // 计算属性（类似 computed）
        doubleCount(state) {
            return state.count * 2
        },
        isLoggedIn(state) {
            return !!state.user
        }
    }
})

