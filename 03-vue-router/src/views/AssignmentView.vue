<script>
export default{
  props: ['id'],
  mounted() {
    console.log(this)
  }
}
</script>

<template>
  <div>
    <h2>
      使用$route.param.id获值会使之其对应路由形成高度耦合，从而使组件只能在某些特定的URL上使用，限制了灵活性。
      所以，使用props解耦合获值会更合适。{{id}}
    </h2>
  </div>
</template>