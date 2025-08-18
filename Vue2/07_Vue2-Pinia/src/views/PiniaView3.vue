<template>
  <div class="pinia3">
    <fieldset>
      <legend>
        {{ id }}
        <button @click="increment">{{ id }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
// storeToRefs 是一个工具函数，它接受一个 store 对象作为参数，并返回一个包含 store 中所有响应式数据的对象。
// 这个对象的每个属性都是一个 ref 对象，对应 store 中的相应数据。【简单理解：将 store 中的数据转换为响应式的 ref 对象】
import {storeToRefs} from 'pinia'
import storeId from '../store'  // storeId就是导出的那个值

const ustoreId = storeId()      // 实例化容器
console.log(ustoreId)
const {counter, increment} = storeToRefs(ustoreId) // 解构出需要使用的属性

export default {
  data() {
    return {
      id: ''
    }
  },
  methods: {
    increment() {
      increment(this.id)
    }
  },
  computed: {},
  mounted() {
    this.id = counter  // 但是这样出来的值会变成一个对象 值的key 为value 使用的时候需要注意
  }
};
</script>

<style scoped>
.pinia3 {
  padding: 20px;
}

fieldset {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 4px;
}

legend {
  padding: 0 10px;
  font-weight: bold;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 3px;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
