<template>
  <v-app id="inspire">
    <!-- v-navigation-drawer是导航抽屉的标签。抽屉的显示和隐藏 v-model绑定 -->
    <v-navigation-drawer
        :dark="dataReturn.dark"
        v-model="dataReturn.drawer"
        :rail="dataReturn.rail"
        disable-resize-watcher
        :color="dataReturn.dark ? 'secondary' : 'background'"
        fixed
        permanent
        app
    >

      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <!--(ml-n2)margin-left  左外边距：负2间距-->
            <v-avatar class='ml-n2' color="surface-variant"
                      @click="dataReturn.rail = false" size="40">
              <v-img src="../assets/1.jpeg"/>
            </v-avatar>
          </template>
          <!--(text-h5)字体大小、(font-italic)斜体、(font-weight-bold)粗体、（ml-4)margin-left左外边距-->
          <v-list-item-title class='text-h5 font-italic font-weight-bold ml-5'>游家纨绔</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-divider/>

      <!-- 左侧菜单 (pt-0)padding-top 上内边距-->
      <v-list class="pt-0" shaped
              flat
              color="blue-lighten-1">
        <!-- 这里的 v-list-group 适用于有子导航的抽屉 -->
        <v-list-group
            v-for="item in items"
            :key="item.title"
        >
          <!-- 一级菜单 -->
          <template v-slot:activator="{ props }">
            <v-list-item
                v-bind="props"
                :prepend-icon="item.action"
                :active="false">{{ item.title }}
            </v-list-item>
          </template>
          <!-- 二级菜单 -->
          <v-list-item
              v-for="child in item.items"
              :key="child.title"
              :title="child.title"
              :value="child.title"
              router
              :to="item.path + child.path">
          </v-list-item>
        </v-list-group>
        <v-divider light/>
      </v-list>
    </v-navigation-drawer>

    <!-- 顶部工具条 -->
    <v-app-bar app dark :color="dataReturn.dark ? 'secondary' : 'primary'">
      <!--隐藏左侧导航列表-->
      <v-app-bar-nav-icon variant="text" @click.stop="dataReturn.rail = !dataReturn.rail"></v-app-bar-nav-icon>
      <!--收起左侧全部列表-->
      <v-btn icon @click.stop="dataReturn.drawer = !dataReturn.drawer">
        <v-icon v-if="dataReturn.drawer" icon='mdi-chevron-left'/>
        <v-icon v-else icon='mdi-chevron-right'/>
      </v-btn>
      <!--主题颜色开关-->
      <v-col md="4">
        <v-switch
            :label="dataReturn.dark ? '暗黑' : '明亮'"
            v-model="dataReturn.dark"
            theme="dataReturn.dark"
            hide-details/>
      </v-col>
      <!--导航标题-->
      <v-col sm="5">
        <v-toolbar-title v-text="dataReturn.title" style="letter-spacing:2px"/>
      </v-col>
      <!--明亮按钮 -->
      <v-btn icon @click.stop="changeThemeFalse">
        <i class="el-icon-sunny" style="font-size: 30px; color: white"/>
      </v-btn>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <!--暗黑按钮-->
      <v-btn icon @click.stop="changeThemeTrue">
        <i class="el-icon-moon" style="font-size: 26px; color: white"/>
      </v-btn>
    </v-app-bar>
    <!--中间内容主体-->
    <v-main>
      <v-container fluid>
        <v-breadcrumbs>
          <v-breadcrumbs-item style="color: #39b9ee;font-size: 15px">{{ item1 }}</v-breadcrumbs-item>&nbsp;&nbsp;
          <!-- mdi为前缀，进入Material Design Icons图标库选择自己想要的图标 -->
          <v-icon>mdi-chevron-right</v-icon>&nbsp;&nbsp;
          <v-breadcrumbs-item>{{ item2 }}</v-breadcrumbs-item>
        </v-breadcrumbs>
        <div>
          <!--定义一个路由锚点，Layout的子组件内容将在这里展示-->
          <router-view/>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import menus from "../plugins/menu";
import {computed, reactive} from "vue";
import vuetify from "@/plugins/vuetify";
import {useRoute} from "vue-router";

let dataReturn = reactive({
  dark: false,  // 是否暗黑主题
  drawer: true, // 左侧导航是否全部隐藏
  rail: false,  // 左侧导航是否部分收起
  title: '游诗成商城后台管理',  // 顶部导航条名称
  menuMap: {}
})

// 引入自定义的菜单数据到计算属性
const items = computed(() => {
  return menus;
});

// 在计算属性中使用route(相当于Vue2里的$route),
const router = useRoute()
const item1 = computed(() => {
  const arr = router.path.split("/");
  return dataReturn.menuMap[arr[1]].name;
});
const item2 = computed(() => {
  const arr = router.path.split("/");
  return dataReturn.menuMap[arr[1]][arr[2]];  // 相当于menuMap[arr[1]].二级菜单的path
})

// 定义方法
const changeThemeFalse = () => {
  dataReturn.dark = false
  vuetify.theme.dark = dataReturn.dark
};
const changeThemeTrue = () => {
  dataReturn.dark = true
  vuetify.theme.dark = dataReturn.dark
}

// setup是在钩子函数created之前执行的
const fullCreated = () => {
  menus.forEach(m => {
    const p1 = m.path.slice(1);
    dataReturn.menuMap[p1] = {name: m.title};
    m.items.forEach(i => {
      dataReturn.menuMap[p1][i.path.slice(1)] = i.title;
    })
  })
}
fullCreated();  // 在钩子函数created之前执行方法
</script>

<!--守卫不能写在setup语法糖里，只能重新写在script-->
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  beforeRouteEnter(to, from, next) {
    console.log(to)
    if (to.matched[0].meta.requiresAuth) { // 如果路由meta中requiresAuth为true，进行拦截
      if (sessionStorage.getItem('user')) {
        next()  // 如果已经登陆可直接进入页面
      } else {  // 否则跳入登录页，并记住要跳入的页面，以方便登陆完成后直接进入该页面
        next({path: '/'})
      }
    }
  }
});
</script>

<style>/*<style lang="less" scoped>*/

/*隐藏滚动条，但保留滚动效果.项目中写在scoped里无效*/
body::-webkit-scrollbar {
  display: none;
}

/*隐藏导航抽屉的滚动条*/
::-webkit-scrollbar {
  width: 0 !important;
}

::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.box {
  width: 90%;
}
</style>
