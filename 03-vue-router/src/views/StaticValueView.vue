<script>
export default {
  name: 'StaticValue',
  props: ['id','username'],
  mounted() {
    console.log(this)
  }
}
</script>

<template>
  <div>
    <h2>获取路由值 -- {{id}} <br> 以及静态值 -- {{username}}</h2>
  </div>
</template>

<style scoped>

</style>