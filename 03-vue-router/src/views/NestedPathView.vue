<script>
export default{
  mounted(){
    console.log(this)
  }
}
</script>

<template>
  <div>
    <h1>NestedPath</h1>
    <router-view></router-view>
  </div>
</template>