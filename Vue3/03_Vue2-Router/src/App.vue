<template id="app">
  <!--导航栏-->
  <router-view name="AsideComponent"/>
  <!--侧边栏-->
  <router-view name="NavComponent"/>
  <!--内容栏-->
  <router-view/>
</template>

<script>
export default {
  /**
   * 监听路线需要注意的是，从当前页面跳转到其他页面是会触发这个监听事件，
   * 但是如果是在当前页面的在地址栏上输入新的Uri地址，则不会触发这个监听事件。
   * 因为时间上渲染的始终是一个页面，在跳转其他渲染组件时，$route中的path发生改变就会触发监听事件。
   * 但是在当前页面的地址栏上输入新的Uri地址，就相当于是重新刷新的页面，从你即将去的页面开始，即就不会触发监听事件。
   */
  watch: {
    '$route': function (to, from) {
      console.log('路由路线发生改变', from, 'to', to);
      // 在这里进行路由变化后的逻辑处理
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
