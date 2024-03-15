<template>
  <v-carousel
      cycle
      height="700"
      hide-delimiter-background
      show-arrows="hover"
  >
    <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
    >
      <v-sheet
          :color="colors[i]"
          height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>

<!--选项式API：可以使用包含多个选项的对象来描述组件的逻辑，例如 data、methods 和 mounted。-->
<!--          选项所定义的属性都会暴露在函数内部的 this 上，它会指向当前的组件实例。-->
<script>
export default {
  data() {
    return {
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
    }
  },
}
</script>
