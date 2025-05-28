<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<!--组合式API：可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 <script setup> 搭配使用。
              这个 setup 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。
              比如，<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。-->
<script setup>
import HelloWorld from '@/components/HelloWorld.vue'

const context = define

</script>
