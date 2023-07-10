<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script setup>
import HelloWorld from '@/components/HelloWorld.vue'
const context = define

</script>

setup () 是vue3新增加的组件。简单点来说，就是vue2里面的data，method，computed···全不要啦，所有数据方法全写在setup里
<script setup> 其实是使用组合式 API 的编译时语法糖。相比于普通的 <script> 语法，它具有更多优势：

更少的样板内容，更简洁的代码。
能够使用纯 Typescript 声明 props 和抛出事件。
更好的运行时性能 (其模板会被编译成与其同一作用域的渲染函数，没有任何的中间代理)。
更好的 IDE 类型推断性能 (减少语言服务器从代码中抽离类型的工作)
