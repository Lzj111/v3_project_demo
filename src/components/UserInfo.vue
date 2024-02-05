<template>
    <div class="user_info">
        <div>user_info.params=> {{ vo }}</div>
        <button @click=addUserAuthor>添加用户权限{{ userInfoStore.authors.length }}</button>
        <button @click=resetAuthor>重置用户权限</button>
        <button @click="patchUpUser">修改用户信息</button>
        <div>userinfoStore=>{{ userInfoStore.name }} {{ userInfoStore.id }} {{ userInfoStore.getAuthors }}</div>
        <div>userFind=>{{ accountsStore.findAccount("admin") }}</div>
        <button @click=addUserAccount>添加账户{{ accountsLen }}</button>
        <button @click="patchAddAcc">$patch添加权限</button>
        <button @click="resetAccount">重置账户</button>
        <div>accountStore=>{{ accountsStore.getAccounts }}</div>
    </div>
</template>
<script setup lang="ts">
import { Ref, computed, ref, watch } from 'vue';
import { useRoute, onBeforeRouteLeave, onBeforeRouteUpdate, } from 'vue-router';
import { useUserInfoStore, useAccountsStore } from "../store/Index.ts";
import { storeToRefs } from 'pinia';

onBeforeRouteLeave((to: any, from: any) => {
    console.log("onBeforeRouteLeave=>", { to, from });
});
onBeforeRouteUpdate((to: any, from: any) => {
    console.log("onBeforeRouteUpdate=>", { to, from });
});

let userInfoStore = useUserInfoStore();
let accountsStore = useAccountsStore();
let { accounts } = storeToRefs(accountsStore);

// > 添加用户权限
let addUserAuthor = () => {
    userInfoStore.addAuthors("manage");
}
// > 重置用户权限
let resetAuthor = () => {
    userInfoStore.$reset();
}
// > 修改用户名称
let patchUpUser = () => {
    userInfoStore.$patch((state) => {
        state.name = "张三丰";
        state.id = Math.random();
    });
}
// > 订阅state
userInfoStore.$subscribe((mutation, state) => {
    console.log("订阅subscribe", { mutation, state });
}, { detached: false });
// > 添加账户
let addUserAccount = () => {
    accountsStore.addAccount({ name: "zhaoliu", password: "zhaoliu", id: 1006 + Math.floor(Math.random() * 10) },);
}
// > 账户数量计算属性
let accountsLen = computed(() => accounts.value.length);
// > 重置初始值
let resetAccount = () => {
    accountsStore.$reset();
}
// > $patch添加用户
let patchAddAcc = () => {
    accountsStore.$patch((state) => {
        state.accounts.push({ name: "zhaoliu", password: "zhaoliu", id: 1006 + Math.floor(Math.random() * 10) });
    });
}

const uRoute = useRoute();
let vo: Ref<string> = ref("");
// > 监听路由变化
watch([() => uRoute.query, () => uRoute.params], (nv: any, ov: any) => {
    console.log("userinfo.watch=>", { ov, nv });
    let obj = uRoute.query?.username ? uRoute.query : uRoute.params;
    vo = ref(JSON.stringify(obj));
}, { immediate: true });

</script>
<style scoped lang="scss">
.user_info {
    width: 100%;
    height: 100%;
    background-color: #fdffe0;
    padding: 10px;
    box-sizing: border-box;

    button {
        margin-right: 5px;
    }
}
</style>