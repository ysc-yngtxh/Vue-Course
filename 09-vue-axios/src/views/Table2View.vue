<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-table :data="allTableData.slice((state.page - 1) * state.limit, state.page * state.limit)"
              :default-sort="{prop:'id',order:'descending'}" border style="width: 100%"
              @sort-change="sortChange" @cell-dblclick="doubleClick">
      <el-table-column sortable prop="id" label="UserId" width="150" align="center"/>
      <el-table-column prop="username" label="UserName" width="350" align="center"/>
      <el-table-column prop="password" label="PassWord" width="200" align="center"/>
      <el-table-column prop="phone" label="Phone" width="250" align="center"/>
      <el-table-column prop="address" label="Address" width="350" align="center"/>

      <el-table-column label="Operate" align="center">
        <template v-slot="ope">
          <el-button type="danger" @click="deletePost(ope.row, ope.column, ope.$index)" circle style="width: 42.4px">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <el-pagination
          background
          layout="prev, pager, next ,total,sizes"
          :total="state.total"
          :page-sizes="[5, 10, 20, 30]"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange" />
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import {Delete} from '@element-plus/icons-vue'
// Vue2中使用element-ui消息组件是'Message'，Vue3使用element-plus消息组件'ElMessage'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  components: {Delete},
  data() {
    return {
      allTableData: [],
      //表格用到的参数
      state: {
        page: 1,
        limit: 10,
        total: 0,
      },
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        id: 0,
        username: '',
        password: '',
        phone: '',
        address: '',
      },
      index: 0
    }
  },
  mounted() {
    this.tableNum()
  },
  methods: {
    //双击单元格
    doubleClick(row, column, cell, event) {
      console.log(row, column, cell, event)
      if (column.property === 'id' || column.property === 'username') {
        return;
      }
      // 将原先单元格内容清空
      event.target.innerHTML = ''
      let cellInput = document.createElement("input");
      // 通过单元格该列的列名得到原先单元格的值赋给input
      cellInput.value = row[column.property];
      cellInput.setAttribute("type", "text");
      cellInput.style.width = "80%";
      cellInput.style.textAlign = "center";
      cellInput.style.borderBlockColor = "B8F3D8FF";
      // 将cellInput作为最后一个子元素添加到元素
      cell.appendChild(cellInput);
      // 聚焦
      cellInput.focus();
      // 失焦
      cellInput.onblur = function () {
        cell.removeChild(cellInput);
        event.target.innerHTML = cellInput.value;
        row[column.property] = cellInput.value;
      };
    },
    tableNum() {
      axios.get('/home/selectPage', {
        params: {
          page: this.state.page,
          size: this.state.limit
        },
        headers: {
          'X-Token': localStorage.getItem("Authorization")
        }
      }).then(response => {
        // let user = eval( JSON.stringify(response.data.data) )
        if (response.data.data === null) {
          return;
        }
        let a = response.data.data.data
        this.allTableData.push.apply(this.allTableData, a)
        this.state.total = response.data.data.total
      })
    },
    //改变页码
    handleCurrentChange(e) {
      this.state.page = e;
      this.tableNum()
    },
    //改变页数限制
    handleSizeChange(e) {
      this.state.limit = e;
      this.tableNum()
    },
    // 默认参数{ column, prop, order }
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange(k) {
      if (k.order === 'descending') {//升序
        this.allTableData.reverse()
      }
      console.log(k)
    },
    // 逻辑删除用户数据
    deletePost(row, column, index) {
      console.log(row)
      console.log(column)
      console.log(index)
      ElMessageBox.confirm(
          '将永久删除该用户数据，继续?',
          'Warning',
          {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        axios.post('/home/deleteUser', {
          id: row.id
        }, {
          headers: {
            'X-Token': localStorage.getItem("Authorization")
          }
        }).then(res => {
          if (res.data.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            });
            this.allTableData.splice(index, 1)
            this.state.total--
          } else {
            ElMessage({
              type: 'error',
              message: '删除失败',
            })
          }
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消删除',
        })
      })
    }
  },
}


</script>

<style scoped>
.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
