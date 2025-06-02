<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>

    <!--router-view 当你的路由path 与访问的地址相符时，会将指定的组件替换该 router-view-->
    <router-view/>
    <!--<router-view/>-->
    <!--<router-view/>-->
    <!--<router-view/>-->
    <!--当存在多个 <router-view/> 的时候，就相当于有相同个指定的组件替换 <router-view/>-->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<script setup lang="ts">
</script>