<template>
  <v-card height="auto" min-height="660px">
    <v-container>
      <v-row>
        <v-col>
          <el-input v-model="filterText" placeholder="Filter keyword"/>
          <el-tree
              :data="categoryList"
              :props="props"
              accordion
              lazy
              :load="loadChildren"/>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import axios from 'axios'
import {reactive, ref} from "vue";

const categoryList = reactive([])
const filterText = ref('')

const props = {
  label: 'name',      // 指定节点标签为节点对象的某个属性值
  children: 'children',  // 指定子树为节点对象的某个属性值
  isLeaf: '!isParent',     // 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效(就是是否还有子节点，为true就是叶子没有节点)
};

// 获取分类列表
const getCategoryList = (pid) => {
  axios.get("/category/list", {
    params: {
      pid: pid
    }
  }).then(resp => {
    let list = eval(JSON.stringify(resp.data));
    let title = Array.from(list);
    title.forEach(el => {
      el._name = el.name;
      if (el.isParent) {
        el.children = [];
      }
    });
    categoryList.push(...title)   // 通过解构函数，将数组数据push到响应式数组categoryList中
  })
};
getCategoryList(0);

// 子分类懒加载
const loadChildren = (node, resolve) => {   // node为当前点击的节点，resolve为数据加载完成的回调(必须调用)
  console.log(node)
  let title = [];
  if (node.data.id === undefined) {
    return resolve([]);
  }
  axios.get("/category/list", {
    params: {
      pid: node.data.id
    }
  }).then(resp => {
    let list = eval(JSON.stringify(resp.data));
    title = Array.from(list);
    title.forEach(el => {
      el._name = node.data._name + "," + el.name;
      if (el.isParent) {
        el.children = [];
      }
    });
    // 这里延迟返回数据是为了有一个加载的效果
    setTimeout(() => {
      return resolve(title)
    }, 500)
  }).catch(() =>  {
    console.log("商品分类的叶子节点没查到!")
    return resolve([])
  })
};
</script>
