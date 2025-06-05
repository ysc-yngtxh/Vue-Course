<template>
  <div>
    <h2>{{$store.getters.addAge}}</h2>
    <h2>{{addAge}}</h2>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "GetterView",
  computed: {
    ...mapGetters(['addAge']),
  }
}
</script>
