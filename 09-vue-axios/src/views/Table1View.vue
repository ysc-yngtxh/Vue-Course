<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-table :data="allTableData.slice((state.page - 1) * state.limit, state.page * state.limit)"
              :default-sort="{prop:'id',order:'descending'}" border style="width: 100%"
              @sort-change="sortChange">
      <!-- sortable默认仅在当前页的数据进行排序 -->
<!--      <el-table-column  prop="" label="Id" width="150" align="center"/>-->
      <el-table-column sortable prop="id" label="UserId" width="150" align="center"/>
      <el-table-column prop="username" label="UserName" width="350" align="center"/>
      <el-table-column prop="password" label="PassWord" width="200" align="center"/>
      <el-table-column prop="phone" label="Phone" width="250" align="center"/>
      <el-table-column prop="address" label="Address" width="350" align="center"/>
      <el-table-column label="Operate" align="center">
        <template v-slot="ope">
          <el-button @click="editUser(ope.row, ope.column, ope.$index)" getSelectionRows type="primary" circle style="width: 42.4px">
            <el-icon>
              <Edit/>
            </el-icon>
          </el-button>&nbsp;&nbsp;
          <el-button type="danger" @click="deletePost(ope.row, ope.column, ope.$index )" circle style="width: 42.4px">
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
          @size-change="handleSizeChange"
      />
    </div>
  </div>


  <!-- 编辑弹窗框 -->
  <el-dialog v-model="dialogFormVisible" title="修改用户数据">
    <el-form :model="form">
      <el-form-item label="UserName" :label-width="formLabelWidth" style="text-align: left;">
        <el-input disabled v-model="form.username" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="PassWord" :label-width="formLabelWidth" style="text-align: left;">
        <el-input v-model="form.password" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="Phone" :label-width="formLabelWidth" style="text-align: left;">
        <el-input v-model="form.phone" autocomplete="off" style="width: 350px;"/>
      </el-form-item>
      <el-form-item label="Address" :label-width="formLabelWidth" style="text-align: left;">
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
// import { reactive} from 'vue'
import axios from 'axios'
import {Delete, Edit} from '@element-plus/icons-vue'
// Vue2中使用element-ui消息组件是'Message'，Vue3使用element-plus消息组件'ElMessage'
import {ElMessage, ElMessageBox} from 'element-plus'

export default {
  components: {Delete, Edit},
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
      index: 0,
    }
  },
  mounted() {
    this.tableNum()
  },
  methods: {
    // const allTableData = reactive({})
    tableNum() {
      axios.get('/home/selectAll', {
        params: {
          // username: '赵一'
          // pageNum:this.state.page*this.state.limit,//从几开始
          // pageSize:this.state.limit//每页多少个
        },
        headers: {
          'X-Token': localStorage.getItem("Authorization")
        }
      }).then(response => {
        // let user = eval( JSON.stringify(response.data.data) )
        let a = response.data.data
        this.allTableData.push.apply(this.allTableData, a)
        this.state.total = this.allTableData.length
      })
    },
    //改变页码
    handleCurrentChange(e) {
      this.state.page = e;
    },
    //改变页数限制
    handleSizeChange(e) {
      this.state.limit = e;
    },
    // 默认参数{ column, prop, order }
    // 当表格的排序条件发生变化的时候会触发该事件
    sortChange(k) {
      if (k.order === 'descending') {//升序
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
      this.form.username = row.username
      this.form.password = row.password
      this.form.phone = row.phone
      this.form.address = row.address
    },
    // 编辑用户数据
    editPostUpdate() {
      axios.post('/home/updateUser', {
        id: this.form.id,
        password: this.form.password,
        phone: this.form.phone,
        address: this.form.address
      }, {
        headers: {
          'X-Token': localStorage.getItem("Authorization")
        }
      }).then(res => {
        if (res.data.code === 200) {
          ElMessage.success("修改成功！")
          this.allTableData[this.index] = this.form
        }
      })
      this.dialogFormVisible = false
    },
    // 逻辑删除用户数据
    deletePost( row, column, index ) {
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
