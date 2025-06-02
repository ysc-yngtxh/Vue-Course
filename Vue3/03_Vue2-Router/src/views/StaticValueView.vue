<template>
  <div>
    <h2>获取路由值 -- {{ id }} <br> 以及静态值 -- {{ username }}</h2>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default {
  name: 'StaticValue',
  props: ['id', 'username'],
  mounted() {
    console.log(this)
  }
}
</script>

<style scoped>

</style>