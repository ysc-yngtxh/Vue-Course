<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-table :data="allTableData.slice((state.page-1)*state.limit, state.page*state.limit)"
              :default-sort="{prop:'id',order:'descending'}" border style="width: 100%"
              @sort-change="sortChange" @cell-dblclick="doubleClick">
      <!-- sortable默认仅在当前页的数据进行排序 -->
      <el-table-column sortable prop="id" label="UserId" width="150" align="center"/>
      <el-table-column prop="userName" label="UserName" width="350" align="center"/>
      <el-table-column prop="passWord" label="PassWord" width="200" align="center"/>
      <el-table-column prop="phone" label="Phone" width="250" align="center"/>
      <el-table-column prop="address" label="Address" width="350" align="center"/>
      <el-table-column label="Operate" align="center">
        <template v-slot="ope">
          <el-button @click="editUser(ope.row, ope.column, ope.$index)" getSelectionRows type="primary" circle
                     style="width: 32px" :disabled="isEditing">
            <el-icon>
              <Edit/>
            </el-icon>
          </el-button>&nbsp;&nbsp;
          <el-button type="danger" @click="deletePost(ope.row, ope.column, ope.$index)" circle
                     style="width: 30px" :disabled="isEditing">
            <el-icon>
              <Delete/>
            </el-icon>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页配置-->
    <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <div style="display: flex; justify-content: center">
        <!--hide-on-single-page 属性标识只有一页时是否隐藏-->
        <el-pagination
            background
            layout="total, prev, pager, next, sizes, jumper"
            :total="state.total"
            :page-sizes="[5, 10, 20, 50]"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>

  <!-- 编辑弹窗框 -->
  <el-dialog v-model="dialogFormVisible" title="修改用户数据">
    <el-form :model="form">
      <el-form-item label="username" :label-width="formLabelWidth" style="text-align: left;">
        <el-input disabled v-model="form.userName" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="password" :label-width="formLabelWidth" style="text-align: left;">
        <el-input v-model="form.passWord" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="phone" :label-width="formLabelWidth" style="text-align: left;">
        <el-input v-model="form.phone" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="address" :label-width="formLabelWidth" style="text-align: left;">
        <el-input v-model="form.address" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="editPostUpdate">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import {Delete, Edit} from '@element-plus/icons-vue'
// Vue2中使用element-ui消息组件是'Message'，Vue3使用element-plus消息组件'ElMessage'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  components: {Delete, Edit},
  data() {
    return {
      allTableData: [],
      // 表格用到的参数
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
        userName: '',
        passWord: '',
        phone: '',
        address: '',
      },
      index: 0,
      isEditing: false
    }
  },
  mounted() {
    this.tableNum()
  },
  methods: {
    // 获取表格数据
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
        // 将数组 a 的所有元素追加到 this.allTableData 中。
        this.allTableData.push.apply(this.allTableData, a)
        this.state.total = response.data.data.total
      })
    },
    // 双击单元格即可进行编辑
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
      // 设置输入框样式（蓝色边框）
      cellInput.style.cssText = `
                                 width: 80%;
                                 text-align: center;
                                 border: 1px solid #53c5f3;
                                 outline: none;
                                 padding: 4px;
                                `;
      // cellInput.style.width = "80%";
      // cellInput.style.textAlign = "center";
      // cellInput.style.border = "1px solid #53c5f3";
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
    // 改变页码
    handleCurrentChange(e) {
      this.state.page = e;
      this.tableNum()
    },
    // 改变页数限制
    handleSizeChange(e) {
      this.state.limit = e;
      this.tableNum()
    },
    // 默认参数{ column, prop, order } 当表格的排序条件发生变化的时候会触发该事件
    sortChange(k) {
      if (k.order === 'descending') {  // 升序
        this.allTableData.reverse()
      }
      console.log(k)
    },
    // 编辑当前行内容
    editUser(row, column, index) {
      // 将当前修改行的元素下标赋值给index，在弹窗中引用
      this.index = index
      console.log(column)
      this.dialogFormVisible = true
      this.form.id = row.id
      this.form.userName = row.userName
      this.form.passWord = row.passWord
      this.form.phone = row.phone
      this.form.address = row.address
    },
    // 编辑用户数据
    editPostUpdate() {
      this.isEditing = true; // 在请求时禁用按钮，避免重复提交
      axios.post('/home/updateUser', {
        id: this.form.id,
        passWord: this.form.passWord,
        phone: this.form.phone,
        address: this.form.address
      }, {
        headers: {
          'X-Token': localStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage.success("修改成功！")
          this.allTableData.forEach((row, indexData) => {
            if (row.id === this.form.id) {
              this.allTableData[indexData] = this.form
            }
          })
        }
      })
      this.dialogFormVisible = false
      this.isEditing = false;
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
        axios.delete('/home/deleteUser', {
          params: {id: row.id},  // 参数会拼接到 URL
          headers: {'X-Token': localStorage.getItem("Authorization")}
        }).then(res => {
          if (res.data.code === 200) {
            ElMessage({
              type: 'success',
              message: '删除成功',
            });
            // this.allTableData.forEach((item, indexData) => {
            //   if (item.id === row.id) {
            //     this.allTableData.splice(indexData, 1)
            //   }
            // })
            this.allTableData = this.allTableData.filter(item => item.id !== row.id);
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
  }
}
</script>

<style scoped>
.demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.el-pagination .is-background {
  text-align: center;
  margin-left: 300px;
}
</style>
