import { createRouter, createWebHashHistory } from 'vue-router'

function route (path, file, name, children) {
  return {
    exact: true,  // 开启精确的匹配路径
    path,
    name,
    children,
    component: () => import('../views' + file)
  }
}

const routes =  [
  route("/", '/IndexView', "IndexView"),   // /login路径，路由到登录组件
  {
    path: "/init", // 根路径，路由到 Home组件
    component: () => import('../views/HomeView.vue'),
    meta: {requiresAuth : true},
    redirect: "/init/dashboard",
    children: [ // 其它所有组件都是 Home的子组件
      route("/init/dashboard", "/DashboardView", "DashboardView"),
      route("/item/category", '/item/CategoryView', "CategoryView"),
      route("/item/brand", '/item/BrandView', "BrandView"),
      route("/item/list", '/item/GoodsView', "GoodsView"),
      route("/item/specification", '/item/Spec/SpecificationView', "SpecificationView"),
      route("/authority/list", '/authority/list', "List"),
      route("/authority/role", '/authority/role', "Role"),
      route("/authority/member", '/authority/member', "Member"),
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router






