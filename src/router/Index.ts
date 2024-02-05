import { createRouter, createWebHistory } from "vue-router";
// > 1.获取路由配置
import list from "./RouterConfig";
import { inject } from "vue";

// > 创建路由实例,并传递routers配置
const router = createRouter({
    // > 当使用这种历史模式时，URL 会看起来很 "正常"，例如 https://example.com/user/id。漂亮!
    // history: new createWebHashHistory(),
    // history: createWebHistory(import.meta.env.BASE_URL),
    history: createWebHistory(),
    // nginx配置=>location / {
    //     try_files $uri $uri/ /index.html;
    // }
    routes: list,
    // strict 为 true 时，将不会匹配带有尾部斜线的路由
    strict: false,
});

// > 全局前置守卫 next:弃用
router.beforeEach(async (to, from) => {
    let info = inject("uInfo");
    console.log("router.beforeEach=>", { to, from, info });
    if (to.path != "/" && Math.random() >= 0.9) {
        // next({ path: "/" });
        // return { path: "/" }
    }
    else {
        // next();
    }
});

// > 全局解析守卫(是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。)
router.beforeResolve(async (to) => {

});

// > 全局后置钩子(它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。)
router.afterEach((to, from, failure) => {
    // >> todo
});

export default router;