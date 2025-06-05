<template>
  <div>
    <h2>{{$store.getters.addNumber}}</h2>
    <h2>{{addNumber}}</h2>
  </div>
</template>

<script>
// import {mapGetters,mapState,mapActions,mapMutations} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: "GetterView",
  computed: {
    // mapGetters 函数是Vuex提供用来映射store中所有的getter对象，
    // mapGetters(['addNumber'])则是映射出对应属性名的对象
    // 解构语法：使用到了es6中的展开运算符（...），表示用于取出 参数对象 所有 可遍历属性 然后拷贝到当前computed中。
    ...mapGetters(['addNumber']),
  },
}
</script>