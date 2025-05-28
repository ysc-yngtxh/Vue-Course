<template>
  <div>
    <h2>
      使用$route.param.id获值会使之其对应路由形成高度耦合，从而使组件只能在某些特定的URL上使用，限制了灵活性。
      所以，使用props解耦合获值会更合适。{{id}}
    </h2>
  </div>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。
              选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default{
  props: ['id'],
  mounted() {
    console.log(this)
  }
}
</script>