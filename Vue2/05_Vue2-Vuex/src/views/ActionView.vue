<template>
  <div>  <!-- 添加一个根元素包裹所有内容 -->
    <el-button type="primary" plain @click="onImages">触发方法</el-button>
    <el-row>
      <ul>
        <li v-for="(item,index) in $store.state.images" :key="index">
          <el-card :body-style="{ padding: '10px',width:'150px',height:'150px' }">
            <img :src="item.url" class="image" referrerpolicy="no-referrer" :alt="item.title"/>
          </el-card>
        </li>
      </ul>
    </el-row>
  </div>  <!-- 结束根元素 -->
</template>

<script>
export default {
  methods: {
    onImages() {
      // dispatch方法是用来触发action的
      this.$store.dispatch('updateImage')
    }
  }

}
</script>

<style>
ul {
  list-style: none;
}

li {
  display: block;
  float: left;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 0;
  min-height: auto;
}

.image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
