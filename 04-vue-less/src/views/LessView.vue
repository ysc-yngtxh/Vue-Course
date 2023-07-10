<template>
  <div id="app">
    <Alert v-if="isAlert" :title="title" :context="context" :cancelEvent="cancelEvent" :comfirmEvent="comfirmEvent"></Alert>
    <HelloWorld v-if="!isAlert" :msg="msg"></HelloWorld>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import Alert from '@/components/AlertComponent.vue'

export default {
  name: 'lessView',
  data(){
    return{
      msg:"Welcome to Your Vue.js App",
      title:"跳转页面",
      context:"是否要跳转至百度",
      isAlert:true
    }
  },
  methods:{
    cancelEvent:function(){
      this.isAlert = false;
    },
    comfirmEvent:function(){
      location.href = 'http://www.baidu.com';
    },
  },
  components: {
    HelloWorld,Alert
  }
}
</script>

<style lang="less">
*{
  padding: 0;
  margin: 0;
}
</style>
