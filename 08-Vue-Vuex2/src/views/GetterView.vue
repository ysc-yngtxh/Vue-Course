<template>
  <div>
    <h2>{{$store.getters.addAge}}</h2>
    <h2>{{addAge}}</h2>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['addAge']),
  },
  name: "GetterView"
}
</script>

<style scoped>

</style>
