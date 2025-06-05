import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 类似于data，表明状态
    state: {
        name: '小明',
        age: 22,
        phone: '13633447788',
        address: '湖北省武汉市洪山区',
        images:[]
    },
    // 可以理解为state的计算属性computed，用以全局缓存
    getters: {
        addNumber(state) {
            return state.phone + state.age
        }
    },
    // 类似于methods，在mutation里处理状态
    // ⚠️：mutations 必须是同步函数，且自动接收 state 和 payload(可选参数)
    mutations: {
        reversePhone1(state, val) {
            console.log(val)
            let num = val.toString().split('').reverse().join('');
            console.log(num)
        },
        reversePhone2(state) {
            let num = state.phone = state.phone.split('').reverse().join('')
            console.log("reversePhone2=" + num)
        },
        setAddress(state, address) {
            state.address = address
        },
        setImages(state, images) {
            state.images = images
        }
    },
    // 异步方法
    // action 提交的是 mutation，而不是直接变更状态
    // ⚠️：actions 可以包含任意异步操作，且自动接收 context(包含state,getters,commit,dispatch) 和 payload(可选参数)
    actions: {
        /**
         * 因为项目需求，项目中引用了图片的网络链接，但是发现了很奇怪的问题，图片链接如果在浏览器的地址栏中可以直接打开，如果在前端项目的Img标签中却无法被渲染。
         * 1、在public/index.html中添加：<meta name="referrer" content="no-referrer">
         * 2、在img标签中添加：<img referrerpolicy="no-referrer" src="xx"/>
         */
        updateImage(context){
            let url = 'https://api.apiopen.top/api/getImages?size=16';
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    const images = res.result.list
                    console.log(images)
                    context.commit('setImages', images)
                })
        }
    },
    modules: {
      // 在一个比较大的项目里十分有很多不同的模块，比如：购物车、论坛、评论、客服。。。
      // 这些模块的数据是不一样的，只有设置在该仓库modules：{}属性中的模块，才能共享数据
    }

     // TODO
    //   1、为什么 mutations 用 state 而 actions 用 context？
    //      mutations：职责单一，只需修改 state，因此直接传入 state。
    //      actions：需要处理异步逻辑、调用其他 action 或访问 getters，因此提供功能更全
    //   2、Vuex 的 store实例使用
    //      提交mutation    this.$store.commit()
    //      调用action      this.$store.dispatch()
    //      访问state       this.$store.state
    //      访问getters     this.$store.getters
})
