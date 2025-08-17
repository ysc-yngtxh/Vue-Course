<template>
  <div class="pinia1">
    <fieldset>
      <legend>
        {{ counter }}
        <button @click="increment">{{ counter }}</button>
      </legend>
    </fieldset>
  </div>
</template>

<script>
import {mapActions, mapState} from 'pinia'
import storeId from '../store' // storeId就是导出的那个值

export default {
  methods: {
    ...mapActions(storeId, ['increment']) // 不把函数补充完整的时候页面会报错
  },
  computed: {
    ...mapState(storeId, ['counter', 'name', 'isAdmin'])
  }
};
</script>


<style scoped>
.pinia1 {
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
