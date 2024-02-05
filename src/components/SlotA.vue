<template>
    <div class="sloatA">
        <span>Slot组件A {{ fullName }}</span>
        <div>依赖注入：{{ userInfo?.name }}</div>
        <input v-model="userInfo.name" />
    </div>
</template>
<script setup lang="ts">
import { defineProps, inject } from 'vue';

defineProps({
    fullName: String,
});
let userInfo: any = inject("userInfo", { name: "默认名称" });
console.log("sloatA.inject.userInfo=>", userInfo);
let il8n = inject("il8n");
console.log("sloatA.inject.il8n=>", il8n);
</script>
<style scoped lang="scss">
.sloatA {
    width: 200px;
    height: auto;
    background-color: bisque;
}
</style>