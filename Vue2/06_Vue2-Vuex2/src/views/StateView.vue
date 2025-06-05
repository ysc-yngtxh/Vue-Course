<template>
  <div>
    <h2>姓名：{{name}}</h2>
    <h2>年龄：{{age}}</h2>
    <h2>电话：{{phone}}</h2>
    <input type="text" v-model="storeAddress"/><br><br>
    <input type="text" v-model="storeAddress"/>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "StateView",
  // 使用计算属性可以完成对state中数据取值和赋值的过程，其包含重写后的get和set方法
  computed: {
    // TODO 这里使用的是ES6的解构方式，获取state状态值
    // 通过这种方式只能获取值，不能对state中的值做修改，如果仓库里属性需要修改就不要定义在mapState中
    ...mapState(['name','age','phone','address']),

    storeAddress: {
      get() {
        return this.$store.state.address
      },
      set(val) {
        return this.$store.commit('setAddress', val)
      }
    },
  }
}
</script>
