<template>
  <div>
    <h2>姓名：{{storeName}}</h2>
    <h2>年龄：{{storeAge}}</h2>
    <h2>电话：{{storePhone}}</h2>
    <input type="text" v-model="storeAddress"/><br><br>
    <input type="text" v-model="storeAddress"/>
  </div>
</template>

<script>
export default {
  name: "StateView",
  // 这里我们不使用data来获取storm中state，而是使用的computed来获取state
  // data只在钩子触发前初始化赋值一次，使用v-model仅修改storeAddress值，而不是仓库state中的数据
  // data(){
  //   return {
  //     storeName: this.$store.state.name,
  //     storeAge: this.$store.state.age,
  //     storePhone: this.$store.state.phone,
  //     storeAddress: this.$store.state.address
  //   }
  // },
  // 使用计算属性可以完成对state中数据取值和赋值的过程，其包含重写后的get和set方法
  computed:{
    storeName:function(){
      return this.$store.state.name
    },
    storeAge:function(){
      return this.$store.state.age
    },
    storePhone:function(){
      return this.$store.state.phone
    },
    storeAddress:{
      get(){
        return this.$store.state.address;
      },
      set(val){
        return this.$store.commit('setAddress', val)
      }
    },
  }
}
</script>

<style scoped>

</style>
