<template>
  <HelloWorld/>
</template>

<script>
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    HelloWorld,
  },
});
</script>
