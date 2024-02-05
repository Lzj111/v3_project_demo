<template>
    <div class="routers">
        <div>route参数: {{ paramsId }}</div>
        <div>
            <button class="router_btn" v-for="item in menus" :key="item.code" @click="routerClick(item)">
                {{ item.name }}</button>
        </div>
        <div class="router_content">
            <RouterView />
            <RouterView name="left" />
            <RouterView name="right" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const uRoute = useRoute();
const uRouter = useRouter();
let paramsId = computed(() => uRoute.params.id);

let menus = ref([
    { name: "动态路由匹配多", code: "dynamic", },
    { name: "用户信息界面", code: "userInfo", },
    { name: "用户信息界面query", code: "userInfoq", },
    { name: "横跨历史go", code: "routergo", },
    { name: "Es6", code: "es6", },
]);

// > 路由跳转: name配合params path配合query
let routerClick: Function = (item: any): void => {
    // console.log("routerClick=>", item);
    switch (item.code) {
        case "dynamic":
            uRouter.push({ path: `/routers/routerInfo/${'张三'}/${Number(4)}`, });
            // uRouter.push({ path: `/routers/routerInfo/${'张三'}/${Math.floor(Math.random() * 10)}`, });
            break;
        case "userInfo":
            // uRouter.push({ path: `/routers/userInfo/${'张三'}/${Number(4)}` })
            uRouter.push({
                name: `userInfo`,
                params: { username: "张三", userid: 4 },
                hash: "#p"
            });
            break;
        case "userInfoq":
            uRouter.push({
                path: `/routers/userInfoq`,
                query: { username: "李四", userid: 2014271 },
                hash: "#q",
                replace: true
            })
            break;
        case "routergo":
            uRouter.go(-2);
            break;
        case "es6":
            uRouter.push({ path: `/es6`, query: { code: "es6" } })
            break;
        default:
            break;
    }
}
</script>

<style scoped lang="scss">
.routers {
    width: 100%;
    height: 100%;
    background-color: #edcfed;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .router_btn {
        margin: 10px 10px 0px 0px;
    }

    .router_content {
        width: 100%;
        height: auto;
        flex: 1;
        margin-top: 10px;
        display: flex;
        flex-direction: row;
    }
}
</style>