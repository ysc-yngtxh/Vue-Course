<template>
  <v-card>
    <v-card-title>
      <v-container>
        <v-col>
          <v-row align-sm="center">
            <v-btn color="primary" @click="addBrand">新增品牌</v-btn>
            <v-spacer/>
            <!--搜索框，与search属性关联-->
            <v-text-field
                label="输入关键字搜索"
                v-model.lazy="tableData.search"
                append-inner-icon="mdi-magnify"
                clear-icon="mdi-window-close"
                variant="underlined"
                hide-details>
            </v-text-field>
          </v-row>
        </v-col>
      </v-container>
    </v-card-title>
    <v-divider/>
    <!-- 表格内容 -->
    <el-table
        :data="tableData.brands"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%"
        highlight-current-row
    >
      <el-table-column type="index" width="100" align="center"/>
      <el-table-column prop="name" label="名称" sortable width="250" align="center"/>
      <el-table-column prop="image" label="LOGO" width="300" align="center">
        <template v-slot:default="scope">
          <div class="demo-image__preview" style="justify-content: center">
            <el-image :src="scope.row.image" :preview-src-list="tableData.isPreView.splice(scope.$index, 1, scope.row.image)"
                      style="width: 102px; height: 30px"
                      fit="fill"
                      alt="无法加载出图片..."/>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="letter" label="首字母" align="center"/>
      <el-table-column label="操作" align="center">
        <template v-slot="ope">
          <el-button type="primary" @click="deletePost(ope.row, ope.column, ope.$index)" circle style="width: 32px">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <!-- 分页 -->
    <div class="demo-pagination-block">
      <el-pagination
          v-model:current-page="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[5, 10, 20, 50]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
      />
    </div>

    <!--弹出的对话框-->
    <v-dialog max-width="500" v-model="tableData.show" persistent scrollable>
      <v-card>
        <!--对话框的标题-->
        <v-toolbar dense dark color="primary">
          <v-toolbar-title>{{ tableData.isEdit ? '修改' : '新增' }}品牌</v-toolbar-title>
          <v-spacer/>
          <!--关闭窗口的按钮-->
          <v-btn icon @click="closeWindow">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <!--对话框的内容，表单-->
        <v-card-text class="px-5" style="height:400px">
          <brand-form @close="closeWindow" :oldBrand="tableData.oldBrand" :isEdit="tableData.isEdit"/>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-card>
</template>


<script setup>
// 导入自定义的表单组件
import BrandForm from './BrandFormView.vue'
import axios from "axios"
import {reactive, ref} from "vue"

const currentPage4 = ref(4)
const pageSize4 = ref(100)

const small = ref(false)
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val) => {
  console.log(val)
}
const handleCurrentChange = (val) => {
  console.log(val)
}

const tableData = reactive({
  search: "",     // 搜索过滤字段
  totalBrands: 0, // 总条数
  brands: [],     // 当前页品牌数据
  loading: true,  // 是否在加载中
  pagination: {page: 1, itemsPerPage: 10, sortBy: [], sortDesc: []}, // 分页信息{page:当前页 itemsPerPage:每页大小 sortBy:排序字段 sortDesc:是否降序}
  show: false,    // 控制对话框的显示
  oldBrand: {},   // 即将被编辑的品牌数据
  isEdit: false,  // 是否是编辑
  isPreView: []   // 预览图片
});

const getDataFromServer = () => {
  // 发起请求
  axios.get('/brand/page', {
    params: {
      key: tableData.search,
      page: tableData.pagination.page,
      rows: tableData.pagination.itemsPerPage,
      sortBy: tableData.pagination.sortBy.join(","),// 这里可以在vuetify中组件属性可以看到是数组类型，必须将其转为string类型，否则sortBy[]
      desc: tableData.pagination.sortDesc.join(",") // 这里必须将数组转为string类型，否则会出现desc[]=false
    }
  }).then(resp => { // 这里使用箭头函数
    let title = eval("(" + JSON.stringify(resp.data) + ")");
    console.log(title)
    tableData.brands = title.items;
    tableData.totalBrands = title.total;
    // 完成赋值后，把加载状态赋值为false
    tableData.loading = false;
  })
}
getDataFromServer()

const addBrand = () => {
  // 修改标记
  tableData.isEdit = false;
  // 控制弹窗可见：
  tableData.show = true;
  // 把oldBrand变为null
  tableData.oldBrand = null;
}
// const editBrand = (oldBrand) => {
//   // 根据品牌信息查询商品分类
//   axios.get('/category/bid/' + oldBrand.id)
//       .then(({data}) => {
//         // 修改标记
//         tableData.isEdit = true;
//         // 控制弹窗可见：
//         tableData.show = true;
//         // 获取要编辑的brand
//         tableData.oldBrand = oldBrand
//         // 回显商品分类
//         tableData.oldBrand.categories = data;
//       })
// }

const closeWindow = () => {
  // 重新加载数据
  getDataFromServer();
  // 关闭窗口
  tableData.show = false;
}

// onMounted(() => { // 渲染后执行
//   // 查询数据
//   getDataFromServer()
// })

// watch(() => tableData.pagination, () => {
//   // 变化后的回调函数，这里我们再次调用getDataFromServer即可
//   getDataFromServer();
// }, {deep: true , immediate: true})
// watch(() => tableData.search, () => {
//   // 变化后的回调函数，这里我们再次调用getDataFromServer即可
//   getDataFromServer();
// }, {deep: true , immediate: true})
</script>

<style scoped>
.demo-pagination-block {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>