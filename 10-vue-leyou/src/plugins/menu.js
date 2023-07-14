let menus = [
    {
        action: "mdi-home",
        title: "首页",
        path:"/init",
        items: [{ title: "统计", path: "/dashboard" }]
    },
    {
        action: "mdi-apps",
        title: "商品管理",
        path:"/item",
        items: [
            { title: "分类管理", path: "/category" },
            { title: "品牌管理", path: "/brand" },
            { title: "商品列表", path: "/list" },
            { title: "规格参数", path: "/specification" }
        ]
    },
    {
        action: "mdi-shield-lock-outline",
        title: "会员管理",
        path:"/user",
        items: [
            { title: "会员统计", path: "/statistics" },
            { title: "会员管理", path: "/list" }
        ]
    },
    {
        action: "mdi-android",
        title: "销售管理",
        path:"/trade",
        items: [
            { title: "交易统计", path: "/statistics" },
            { title: "订单管理", path: "/order" },
            { title: "物流管理", path: "/logistics" },
            { title: "促销管理", path: "/promotion" }
        ]
    },
    {
        action: "mdi-account",
        title: "权限管理",
        path:"/authority",
        items: [
            { title: "权限管理", path: "/list" },
            { title: "角色管理", path: "/role" },
            { title: "人员管理", path: "/member" }
        ]
    }
]

export default menus;
