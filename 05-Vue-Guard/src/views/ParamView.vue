<template>
  <div>
    <button @click="changeParam">改变路由参数</button>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default {
  name: "ParamView",
  methods:{
    changeParam(){
      this.$router.push('/param/2')
    }
  },
  beforeRouteEnter (to, from, next) {
    console.log('组件内路由：会在进入该路由时被触发-----')
    next()
  },
  beforeRouteUpdate (to, from, next) {
    console.log('组件内路由：该路由中参数改变时执行-----')
    next()
  },
  beforeRouteLeave () {
    console.log('组件内路由：在当前组件即将从路由中移除时调用-----')
  }
}
</script>

<style scoped>
button {
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
