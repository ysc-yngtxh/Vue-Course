<template>
  <div class="pinia2">
    <fieldset>
      <legend>
        {{ counterStore.counter }}
        <button @click="counterStore.increment()">{{ counterStore.counter }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
import useCounterStore from '../store'

export default {
  // TODO 这里使用到了 Vue3 中的组合式API的概念
  setup() {
    const counterStore = useCounterStore()
    return { counterStore }
  }
}
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
