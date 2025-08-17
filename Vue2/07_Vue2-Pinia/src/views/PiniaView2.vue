<template>
  <div class="pinia2">
    <fieldset>
      <legend>
        {{ counter }}
        <button @click="increment">{{ counter }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
// import {mapState, mapActions,} from 'pinia'
import storeId from '../store'  // storeId就是导出的那个值

const ustoreId = storeId() // 实例化容器
console.log(ustoreId)
const {counter} = ustoreId // 解构出来的值是不能动态绑定的 可以通过下面的方法

export default {
  data() {
    return {
      id: ''
    }
  },
  methods: {},
  computed: {},
  mounted() {
    this.id = counter
  }
};
</script>


<style scoped>
.pinia2 {
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
