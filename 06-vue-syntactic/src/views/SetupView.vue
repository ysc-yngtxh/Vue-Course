<template>
  <div>
    <h2>Vue3中setup详解</h2>
    <h2>{{ userName }}</h2>
    <h2>{{ param }}</h2>
    <h2>{{ paramGetSet }}</h2>
    <button @click="setupVue3">setup按钮</button>
  </div>
  <setup-children @sendEmit="sendDate" :sendProps="data" ref="sonText"></setup-children>
  <br>
  <h1 v-if="parent.value !== undefined" >{{ parent.value }}</h1>
</template>

<script setup>  // <script setup> 这种语法糖是不需要属性跟方法有返回值的

import SetupChildren from '@/components/SetupChildrenComponent.vue'
import {computed, onMounted, reactive, ref} from "vue";  // 引用组件只需要导入，不用再注册到components里

let userName = '我是如来佛祖玉皇大帝观音菩萨指定西天取经特派使者花果山水帘洞齐天大圣孙悟空'
let data = '父组件通过Props传值给子组件'
let user = reactive({
  firstName: 'hello',
  lastName: 'world'
})

const setupVue3 = () => {
  console.log('setupVue3方法')
}

// 响应式的数据，即动态数据值实时变化，还有ref()方法也是响应式数据
let parent = reactive({value: null});
const sendDate = (e) => {
  parent.value = e;
  console.log(parent.value)
}

// 获取子组件中暴露的属性值
const sonText = ref(null)
onMounted(() => {
  console.log(sonText.value.childrenText)
})

const param = computed(() => {
  return "你好，我是计算属性"
})
const paramGetSet = computed( {
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
const func1= () => {
  console.log("func1");
}
func1();  // 因为setup即相当于created:

</script>

<style scoped>

</style>