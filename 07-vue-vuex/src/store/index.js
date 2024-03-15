import {createStore} from 'vuex'

// 创建整个项目的数据仓库对象，将多组件公用的数据放置到此对象里
export default createStore({
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
  actions: {
    /** TODO
     * 因为项目需求，项目中引用了图片的网络链接，但是发现了很奇怪的问题，图片链接如果在浏览器的地址栏中可以直接打开，如果在前端项目的Img标签中却无法被渲染。
     * 1、在public/index.html中添加：<meta name="referrer" content="no-referrer">
     * 2、在img标签中添加：<img referrerpolicy="no-referrer" src="xx"/>
     */
    updateImage(context){
      let url = 'https://api.apiopen.top/api/getImages?size=16';
      fetch(url).then(res=>res.json()).then(res=>{
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
})
