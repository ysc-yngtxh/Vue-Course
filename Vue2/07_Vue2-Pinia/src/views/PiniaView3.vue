<template>
  <div class="pinia3">
    <fieldset>
      <legend>
        {{ mainStore.counter }}
        <button @click="mainStore.increment">{{ mainStore.counter }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
import {storeToRefs} from 'pinia'
import storeId from '../store'  // storeId就是导出的那个值

const ustoreId = storeId()      // 实例化容器
console.log(ustoreId)
const {counter} = storeToRefs(ustoreId) // 这样使用

export default {
  data() {
    return {
      id: ''
    }
  },
  methods: {},
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
