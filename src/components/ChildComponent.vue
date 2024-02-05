<template>
    <div class="child">{{ titie }}</div>
    <button @click="btnClick">子组件点击</button>
    <button @click="btnClick1">123</button>
    <div v-for="(item, index) in dataList">{{ item }} {{ index }}</div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineExpose, defineProps } from 'vue';

let dataList = defineProps(["dataList"]);
console.log("dataList", dataList)

let titie = ref("这是一个子组件");
let events = defineEmits(["childClick", "someEvent"]);
let btnClick = () => {
    events("childClick", "子组件参数")
}
let btnClick1 = () => {
    events("someEvent", "123");
}
let cClick = (e: any) => {
    console.log("父组件调用子组件函数.childClick", e);
}
let cData1 = ref("子组件的data")
defineExpose({
    cData1,
    cClick
})
</script>

<style scoped lang="scss">
.child {}
</style>