<template>
  <div>
    <el-form style="width: 410px;margin-left: 460px;margin-top: 5px" ref="ruleFormRef" status-icon
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

    <img src="../assets/logo.png" alt=""/>
    <div>
      <p>
        如果成功地将 Element-UI 添加到这个项目中，您将看到下面的<code v-text="'<el-button>'"/>below
      </p>
      <el-button type="primary">el-button</el-button>
    </div>

    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import {postRequired} from "@/plugins/axios.js";

export default {
  name: 'HomeView',
  data() {
    // 表单验证规则
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入用户名'));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'));
      } else if (value.length < 6) {
        callback(new Error('密码长度不能少于6位'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      rules: {
        username: [{required: true, validator: validateUsername, trigger: 'blur'}],
        password: [{required: true, validator: validatePassword, trigger: 'blur'}]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs.ruleFormRef.validate(valid => {
        if (valid) {
          this.handleLogin();
        } else {
          console.log('表单验证失败');
          return false;
        }
      });
    },
    async handleLogin() {
      try {
        const res = await postRequired('/login', {
          username: this.ruleForm.username,
          password: this.ruleForm.password
        });
        if (res.data.code === 200) {
          localStorage.setItem("Authorization", res.data.data);
          this.$router.push('/table');
          this.$message.success('登录成功');
        } else {
          this.$message.error(res.data.message);
        }
      } catch (error) {
        this.$message.error('登录请求失败');
        console.error('登录错误:', error);
      }
    },
    resetForm() {
      this.$refs.ruleFormRef.resetFields();
    }
  },
  components: {
    HelloWorld
  }
}
</script>