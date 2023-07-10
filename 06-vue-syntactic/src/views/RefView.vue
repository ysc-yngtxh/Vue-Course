<template>
  <div>
    <div>ref操作DOM和组件</div>
    <hr>
    <div ref='info'>hello</div>
    <ul>
      <li ref="fruit" v-for='item in fruits' :key='item.id'>{{ item.name }}</li>
    </ul>
    <button @click='handleClick'>点击</button>
  </div>
</template>

<script>
import {ref, toRefs, isRef, reactive} from 'vue'

export default {
  name: 'App',
  watch: {
    '$route': function (to, from) {
      console.log('路由路径发生改变', from, 'to', to)
    }
  },
  // TODO 定义变量需要在 setup() 函数中进行；需要注意的是，定义的变量与方法在最后都要返回给模板使用
  setup() {

    // reactive中用以存放对象数据
    let add = reactive(
        {
          id: 2,
          name: 'orange'
        }
    )

    // 死死记住：ref本质也是reactive，ref(obj)等价于reactive({value: obj})
    const dump = ref('setDump')
    console.log('isRef()方法-------' + isRef(dump))  // 判断是否是一个Ref类型数据
    console.log("获取ref('setDump')----" + dump.value)  // 获取dump值

    // def定义对象使用{}键值对形式
    const dump2 = ref({'a': 'dump2'})
    console.log("获取ref({'a': 'dump2'})----" + dump2.value.a)

    // 将reactive类型数据转为普通类型数据
    let fru = toRefs(add)
    console.log('reactive类型数据转为普通类型数据-------')
    console.log(fru)

    // Vue3中通过ref操作DOM
    // 1、定义一个响应式变量
    //    ref()与ref(null)意义相同
    //    ref(null)定义变量名与div中ref保持一致，进行匹配，即可获取其元素节点实例
    const info = ref(null)
    const fruit = ref(null)

    const fruits = ref(
        [
          {
            id: 1,
            name: 'apple'
          },
          {
            id: 2,
            name: 'orange'
          }
        ]
    )

    const handleClick = () => {
      // 此时可以通过info变量操作DOM
      console.log('获取info元素节点上的执行HTML ---- '+info.value.innerHTML)

      console.log('获取fruit元素节点上的执行HTML ---- '+fruit.value[1].innerHTML)
    }

    // setup()把变量返回给模板使用
    return {fruits, info, fruit, handleClick}
  }
}
</script>
