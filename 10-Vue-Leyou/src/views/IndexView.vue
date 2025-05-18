<template>
  <div class="background">
    <vue-particles
        color="#dedede"
        :particleOpacity="0.7"
        :particlesNumber="80"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="3"
        :hoverEffect="true"
        hoverMode="bubble"
        :clickEffect="true"
        clickMode="repulse"
        lines-width="100%">
    </vue-particles>
    <!--
    color: String类型。默认'#dedede'。粒子颜色。
    particleOpacity: Number类型。默认0.7。粒子透明度。
    particlesNumber: Number类型。默认80。粒子数量。
    shapeType: String类型。默认"circle"。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
    particleSize: Number类型。默认80。单个粒子大小。
    linesColor: String类型。默认'#dedede'。线条颜色。
    linesWidth: Number类型。默认1。线条宽度。
    lineLinked: 布尔类型。默认true。连接线是否可用。
    lineOpacity: Number类型。默认0.4。线条透明度。
    linesDistance: Number类型。默认150。线条距离。
    moveSpeed: Number类型。默认3。粒子运动速度。
    hoverEffect: 布尔类型。默认true。是否有hover特效。
    hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
    clickEffect: 布尔类型。默认true。是否有click特效。
    clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"
    -->
    <div class="son">
      <el-form :model="userForm.ruleForm" status-icon ref="ruleForm" class="demo-ruleForm">
        <p style="text-align: center; font-size: 30px; font-family: 楷体,serif; margin: 0 auto"><b>在线登陆系统</b></p>

        <el-form-item prop="name" :rules="{required:true, message:'请输入用户名', trigger:'blur'}">
          <!--prop作用是去验证规则rules中找到对应的属性规则-->
          <!--required 一般用在做校验判断当前选项内容是否为必填。blur失去焦点，比如输入框里。校验文本框是否为空-->
          <el-input type="text" v-model="userForm.ruleForm.name" autocomplete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="pwd" :rules="{required:true, message:'请输入密码', trigger:'blur'}">
          <el-input type="password" v-model="userForm.ruleForm.pwd" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item prop="code" :rules="{required:true, message:'请输入验证码', trigger:'blur'}">
          <el-input type="text" v-model="userForm.ruleForm.code" placeholder="点击图片更换验证码" style="width:210px;top: 0"></el-input>
          <img :src="captUrl" @click="updateCaptcha" style="position: absolute;margin-top:0;margin-left:230px" alt="更换验证码"/>
        </el-form-item>
        <el-checkbox v-model="checked" style="position:relative;top:-5px">记住我</el-checkbox>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="margin-left: 80px">提交</el-button>
          <el-button @click="resetForm()" style="margin-left: 50px">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>


<script setup>
import {postRequired} from "@/plugins/api";
import {reactive, ref} from "vue";
import router from '@/router'
import {ElMessage} from "element-plus";

let userForm = reactive({
  ruleForm: {
    name: "游诗成",
    pwd: "322",
    code: ""
  }
})
let captUrl = ref('/captcha?time=' + new Date())
let checked = ref(true)

const ruleForm = ref(null)

const updateCaptcha = () => {
  captUrl = '/captcha?time=' + new Date();
}
const submitForm = () => {
  /* 取出表单组件form，进行校验 */
  ruleForm.value.validate( (valid) => {
    if (valid) {
      postRequired('/login', userForm.ruleForm).then(resp => {
        alert(JSON.stringify(resp.data)); /* 将json对象转化为json字符串 */
        let newData = eval("("+JSON.stringify(resp.data)+")"); /* 解析json */
        console.log(newData.obj)
        if (newData.code === 200){
          localStorage.setItem("Authorization", newData.obj);
          console.log(localStorage.getItem("Authorization"));
          sessionStorage.setItem("user",userForm.name);

          router.push({
            path:"/init",
          },function(){
            console.log("成功跳转页面")
          })
        }
      });
    } else {
      ElMessage({
        showClose: false,
        message: '请输入所有字段！',
        type: 'warning'
      })
    }
  })
}
const resetForm = () => {
  userForm = reactive({
    ruleForm: {}
  });
}
</script>

<style>
body{
  padding: 0;
  margin: 0;
}
/*隐藏滚动条，但保留滚动效果*/
::-webkit-scrollbar{
  display:none;
}
.background{
  width: 100%;
  height: 100%;
  margin: 0;
  background: url("../assets/timg.jpg")no-repeat;
  position: fixed;
  display: flex;
  justify-content: center;
  align-content: center;  /*水平居中*/
}
/*组件v-particles的Id属性css*/
#particles-js{
  width: 100%;
  height: 100%;
  position: fixed;
}
.demo-ruleForm{
  border-radius: 15px; /*边界半径*/
  background-clip: padding-box;
  margin: 180px 550px; /*外边距*/
  width: 400px;
  padding: 15px 35px 15px 35px; /*内边距*/
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background: url("../assets/4.jpg")no-repeat;
  background-size: 100% 100%;
  position: relative;
}
</style>