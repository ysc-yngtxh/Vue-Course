<template>
  <div class="pinia2">
    <fieldset>
      <legend>
        {{ mainStore.counter }}
        <button @click="mainStore.increment">{{ mainStore.counter }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
// 导入 pinia 实例
import useMainStore from '../store'

export default {
  data() {
    return {
      mainStore: useMainStore()
    }
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
