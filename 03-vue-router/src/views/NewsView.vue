<template>
  <div>
    <h2>实时播报新闻</h2>
    <div class="option">
      <router-link :to="'/'">Home</router-link>
      ｜
      <router-link :to="{name:'About'}">About</router-link>
      ｜
      <router-link :to="{path:'/news'}" replace>新闻</router-link>
      ｜
      <router-link :to="'/me/123'">个人中心</router-link>
    </div>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default {
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style>
.option a{
  text-decoration: none;
  color: #2c3e50;
}
.option a.router-link-exact-active {
  color: #42b983;
}
</style>
