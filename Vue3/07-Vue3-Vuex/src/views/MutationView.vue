<template>
  <div>
    <el-button type="primary" plain @click="onMutation1('123')">触发方法</el-button>
    <br><br>
    <el-button type="primary" plain @click="onMutation2">触发方法2</el-button>
    <h2>{{$store.state.phone}}</h2>
    <h2>{{getNum}}</h2>
  </div>
</template>

<script>
export default {
  name: "MutationView",
  methods:{
    onMutation1(va){
      console.log("耶~")
      this.$store.commit('reversePhone1', va)
    },
    onMutation2(){
      this.$store.commit('reversePhone2')
    }
  },
  computed:{
    getNum(){
      return this.$store.state.phone
    }
  }
}
</script>

<style scoped>
.my-button {
  background-color: #d3d3f1;
  color: black;
  padding: 10px 20px;
}
</style>
