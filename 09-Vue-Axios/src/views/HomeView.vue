<template>
  <div>
    <el-form style="width: 410px;margin-left: 460px;margin-top: 60px" ref="ruleFormRef" status-icon
             :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
      <el-form-item prop="username">
        <el-input v-model="ruleForm.username" type="username" autocomplete="off" placeholder="用户名"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="密码"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>

  <img src="../assets/logo.png" alt=""/>
  <div>
    <p>
      如果成功地将Element Plus添加到这个项目中，您将看到下面的 {{'<el-button>'}}
      <code v-text="'<el-button>'"></code>
      below
    </p>
    <el-button type="primary">el-button</el-button>
  </div>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script setup>
import {reactive, ref} from 'vue'
import router from "@/router";
import {postRequired} from "@/http/axios";
import HelloWorld from "@/components/HelloWorld.vue";

const ruleFormRef = ref()

const validateUsername = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the username'))
  } else {
    if (ruleForm.username !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  username: '',
  password: '',
})
// 表单验证规则
const rules = reactive({
  username: [{validator: validateUsername, trigger: 'blur'}],
  password: [{validator: validatePassword, trigger: 'blur'}],
})

const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      // 用户名密码输入完成后发送请求，判断是否登录成功
      // post有三个参数 --> url,data,config
      // TODO 异步请求写法一

      // axios.post('/home/login', {
      //   username: ruleForm.username,
      //   password: ruleForm.password
      // }, {
      //   headers: {
      //     'Content-Type': 'application/json;charset=utf-8'
      //   },
      // }).then(res => {
      //   if (res.data.code === 200) {
      //     console.log(res.data.message)
      //     localStorage.setItem("Authorization", res.data.data)
      //     // location.href='http://localhost:8081/#/table1'
      //     router.push('/table1')
      //   } else {
      //     console.log(res.data.message)
      //   }
      // })


      // TODO 异步请求方法二
      postRequired('/login', {
        username: ruleForm.username,
        password: ruleForm.password
      }).then(res => {
        if (res.data.code === 200) {
          console.log(res.data)
          localStorage.setItem("Authorization", res.data.data)
          // location.href='http://localhost:8081/#/table1'
          router.push('/table')
        } else {
          console.log(res.data.message)
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>