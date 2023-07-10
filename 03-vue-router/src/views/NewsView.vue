<script>
export default {
  mounted() {
    console.log(this.$route)
  }
}
</script>

<template>
  <div>
    <h2>实时播报新闻</h2>
    <div class="pepo">
      <router-link to="/">Home</router-link>
      ｜
      <router-link to="/about">About</router-link>
      ｜
      <router-link to="/news">新闻</router-link>
      ｜
      <router-link to="/me/:id">个人中心</router-link>
    </div>
  </div>
</template>

<style>
.pepo a{
  text-decoration: none;
  color: #2c3e50;
}
</style>
