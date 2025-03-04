<template>
  <div>
    <h1>NestedPath</h1>
    <router-view></router-view>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default{
  mounted(){
    console.log(this)
  }
}
</script>

