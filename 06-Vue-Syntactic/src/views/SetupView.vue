<template>
  <div>
    <h2>Vue3中setup详解</h2>
    <h2>{{ userName }}</h2>
    <h2>{{ param }}</h2>
    <h2>{{ paramGetSet }}</h2>
    <button @click="setupVue3">setup按钮</button>
  </div>
  <!--ref 在模板中用于引用 DOM 元素或子组件实例，而在 <script setup> 中使用 ref 创建的响应式引用-->
  <setup-children @sendEmit="sendDate" :sendProps="data" ref="sonText"></setup-children>
  <br>
  <h1 v-if="parent.value !== undefined">{{ parent.value }}</h1>
</template>

<!--组合式API：可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 <script setup> 搭配使用。
              这个 setup 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。
              比如，<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。-->
<script setup>    // <script setup> 这种语法糖是不需要属性跟方法有返回值的
import SetupChildren from '@/components/SetupChildrenComponent.vue'
import {computed, onMounted, reactive, ref} from "vue"; // 引用组件只需要导入，不用再注册到components里

let userName = '我是如来佛祖玉皇大帝观音菩萨指定西天取经特派使者花果山水帘洞齐天大圣孙悟空'
let data = '父组件通过Props传值给子组件'
const setupVue3 = () => {
  console.log('setupVue3方法')
}

// TODO ref() 接受一个内部值，返回一个ref 对象，这个对象是响应式的、可更改的，且只有一个指向其内部值的属性 .value。
//      ref() 将传入参数的值包装为一个带 .value 属性的 ref 对象。
const sonText = ref(null)  // 创建一个初始化值为 null 的响应式引用：sonText；并把这个引用绑定子组件 <setup-children>
onMounted(() => {
  // 获取子组件中暴露的属性值
  console.log(sonText.value.childrenText)
})

// TODO reactive() 函数用来创建响应式对象，它接收一个对象A/数组参数，返回对象A的响应式 proxy 代理对象。
//      reactive 一般用于对象/数组类型的数据，都不需要使用 .value；
//      ref一般用于基础数据类型的数据，在 JS 中读取和修改时，需要使用 .value；
let parent = reactive({value: null});
const sendDate = (e) => {
  parent.value = e;
  console.log(parent.value)
}
let user = reactive({
  firstName: 'hello',
  lastName: 'world'
})

// TODO 计算属性
const param = computed(() => {
  return "你好，我是计算属性"
})
const paramGetSet = computed({
  get() {
    return user.firstName + '-·-' + user.lastName
  },
  set(val) {
    const nameList = val.split('-·-')
    user.firstName = nameList[0]
    user.lastName = nameList[1]
  }
})

// setup里没有beforeCreate和created钩子方法，但是setup是执行在这两个钩子方法之前的
const func1 = () => {
  console.log("func1");
}
func1();  // 因为setup即相当于created:
</script>

<style scoped>

</style>