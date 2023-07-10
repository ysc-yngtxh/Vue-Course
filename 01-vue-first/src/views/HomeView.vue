<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'   // ..表示的是上一级目录， @表示的特定的目录，即src包

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>
