<template>
  <div id="app">
    <Alert v-if="isAlert" :title="title" :context="context" :cancelEvent="cancelEvent"
           :comfirmEvent="comfirmEvent"></Alert>
    <HelloWorld v-if="!isAlert" :msg="msg"></HelloWorld>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Alert from '@/components/AlertComponent.vue'

export default {
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      title: "跳转页面",
      context: "是否要跳转至百度",
      isAlert: true
    }
  },
  methods: {
    cancelEvent: function () {
      this.isAlert = false;
    },
    comfirmEvent: function () {
      location.href = 'http://www.baidu.com';
    },
  },
  components: {
    HelloWorld, Alert
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
}
</style>
