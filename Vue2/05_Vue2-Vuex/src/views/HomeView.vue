<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld :msg="msg"/> <!--传递 msg 属性给 HelloWorld 组件-->
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue' // ..表示的是上一级目录， @表示的特定的目录，即src包

export default {
  name: 'HomeView',
  data() {  // 使用 data 定义响应式属性
    return {
      msg: "Welcome to Your Vue.js App"  // ✅ 定义在 data 中
    };
  },
  components: {
    HelloWorld
  }
}
</script>
