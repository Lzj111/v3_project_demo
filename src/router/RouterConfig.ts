const list = [{
    path: "/:pathMatch(.*)*",
    name: "notFound",
    title: "404",
    component: () => import("../views/NotFound.vue")
}, {
    path: "/",
    name: "/",
    title: "基础",
    alias: ["/home"],
    components: {
        // > 命名视图
        left: () => import("../views/Left.vue"),
        right: () => import("../views/Home.vue"),
    }
}, {
    path: "/info",
    name: "/info",
    title: "深入组件",
    component: () => import("../views/Info.vue"),
    // sensitive 为 true 时，将区分大小写
    sensitive: true,
}, {
    path: "/multiplex",
    name: "/multiplex",
    title: "逻辑复用",
    component: () => import("../views/Multiplex.vue")
}, {
    path: "/senior",
    name: "/senior",
    title: "最佳实践&Ts",
    component: () => import("../views/Senior.vue")
}, {
    path: "/redirect",
    name: "/redirect",
    title: "重定向~基础",
    // >> 重定向
    // redirect: {
    //     path: "/", params: { username: "张三丰" }
    // }
    // >> 相对重定向
    redirect: to => {
        return "info";
    }
}, {
    path: "/routers",
    name: "/routers",
    title: "路由&Pinia",
    // >> 任何人都可以查看
    meta: { requiresAuth: false },
    component: () => import("../views/Routers.vue"),
    children: [
        {
            path: "routerInfo/:username/:userid(\\d+)?",
            name: "routerInfo",
            components: {
                left: () => import("../components/RouterInfo.vue"),
                right: () => import("../components/UserInfo.vue"),
            },
            // sensitive 为 true 时，将区分大小写
            sensitive: true,
            // >> 对于有命名视图的路由，你必须为每个命名视图定义 props 配置：
            props: {
                left: true,
                right: false,
            }
        },
        // {
        //     path: "routerInfo/:orderId(\\d+)",
        //     name: "routerInfo",
        //     component: () => import("../components/RouterInfo.vue")
        // },
        // {
        //     path: "routerInfo/:productName",
        //     name: "routerInfo",
        //     component: () => import("../components/RouterInfo.vue")
        // },
        {
            path: "userInfo/:username/:userid",
            name: "userInfo",
            component: () => import("../components/UserInfo.vue"),
            // >> sensitive 为 true 时，将区分大小写
            sensitive: true,
            // 将 props 传递给路由组件
            props: {
                newsletterPopup: false
            },
            // >> 路由独享的守卫(守卫 只在进入路由时触发)
            beforeEnter: (to, from) => {
                // reject the navigation
                return () => { }
            },
        },
        {
            path: "userInfoq",
            name: "userInfoq",
            component: () => import("../components/UserInfo.vue"),
            // sensitive 为 true 时，将区分大小写
            sensitive: true,
            props: route => { userinfo: route.query }
        },
    ]
}, {
    path: "/es6",
    name: "es6",
    title: "ECMA2016",
    component: () => import("../views/Es6.vue")
}]
export default list;