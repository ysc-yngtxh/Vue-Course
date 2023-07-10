<template>
  <h4>SetupChildren组件</h4>
  <button @click="onSend">我是子组件，点击我给父组件传Hello World</button><br><br><br>
  <button @click="onProps">我是子组件，点击我。父组件会传值给我</button>
  <h1 id="props" :class="array.value">{{PropsBy.sendProps}}</h1>
</template>

<script setup>
import {defineEmits, defineProps, reactive, defineExpose, ref} from 'vue'

// $emit 触发事件
const onEmit = defineEmits(['sendEmit']);
const onSend = () => {
  onEmit('sendEmit', 'Hello World')
}

// Props 父传子 值
const PropsBy = defineProps({
  sendProps:{
    type: String
  }
})
let array = reactive({value: 'props'})
const onProps = () => {
  // 方式一：原生js修改class
  // document.getElementById("props").classList.remove('props')
  array.value = ''  // 方式二：动态绑定属性的方式修改class
}

// 子组件提供暴露的属性值
const childrenText = ref('迷人的笑脸，幸福地线，慵懒地躲在你的怀里面')
defineExpose({
  childrenText
})

</script>

<style scoped>
.props{
  display: none;
}
</style>