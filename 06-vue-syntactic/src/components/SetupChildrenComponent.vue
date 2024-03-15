<template>
  <h4>SetupChildren组件</h4>
  <button @click="onSend">我是子组件.点击我给父组件传Hello World</button>
  <br><br><br>
  <button @click="onProps">我是子组件.点击我,父组件会传值给我</button>
  <h1 :class="array.value">{{ PropsBy.sendProps }}</h1>
</template>

<!--组合式API：可以使用导入的 API 函数来描述组件逻辑。在单文件组件中，组合式 API 通常会与 <script setup> 搭配使用。
              这个 setup 是一个标识，告诉 Vue 需要在编译时进行一些处理，让我们可以更简洁地使用组合式 API。
              比如，<script setup> 中的导入和顶层变量/函数都能够在模板中直接使用。-->
<script setup>
import {defineEmits, defineExpose, defineProps, reactive, ref} from 'vue'

// TODO 定义 $emit 触发事件
const onEmit = defineEmits(['sendEmit']);
const onSend = () => {
  onEmit('sendEmit', 'Hello World') // 调用 $emit 触发事件
}

// TODO 定义 Props 父传子 值
const PropsBy = defineProps({
  sendProps: {
    type: String
  }
})

// 定义一个响应式对象，绑定<h1>标签的class属性，从而控制该标签是否显示
let array = reactive({value: 'props'})
const onProps = () => {
  // 方式一：原生js修改class
  // document.getElementById("props").classList.remove('props')
  // 方式二：动态绑定属性的方式修改class
  array.value = ''
}

// TODO 定义子组件提供暴露的属性值。方便父组件中通过子组件实例(ref)获取暴露值
const childrenText = ref('迷人的笑脸，幸福地线，慵懒地躲在你的怀里面')
defineExpose({
  childrenText
})
</script>

<style scoped>
.props {
  display: none;
}
</style>