<template>
  <div>
    <el-button type="primary" plain @click="setAddress('setAddress')">mapMutations</el-button>
    <br><br>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  name: "MutationView",
  methods:{
    ...mapMutations(['setAddress'])
  }
}
</script>

<style scoped>
</style>
