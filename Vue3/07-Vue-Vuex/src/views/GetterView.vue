<template>
  <div>
    <h2>{{$store.getters.addNumber}}</h2>
    <h2>{{addNumber}}</h2>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed:{
    ...mapGetters(['addNumber']),
  },
  name: "GetterView"
}
</script>

<style scoped>

</style>
