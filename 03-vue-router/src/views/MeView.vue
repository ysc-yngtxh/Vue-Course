<script>
export default{
  mounted() {
    console.log(this)
  }
}
</script>

<template>
  <div>
    <h2>Hello，你好！{{$route.params.id}}</h2>
    <div class="pepo">
      <router-link to="/">Home</router-link>
      ｜
      <router-link to="/about">About</router-link>
      ｜
      <router-link to="/news">新闻</router-link>
      ｜
      <router-link to="/me/123">个人中心</router-link>
    </div>
  </div>
</template>

<style scoped>
.pepo a{
  text-decoration: none;
  color: #2c3e50;
}
.pepo a.router-link-exact-active {
  color: #42b983;
}
</style>