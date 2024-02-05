<template>
    <div class="about">
        <h1>This is an about page</h1>

        <!-- 深入组件prop -->
        <div>{{ fullName }}</div>
        <DeepComponent class="deep-com" v-bind="{ userInfo, list }" :version="version" @emit-btn="childEvent"
            @user-info="getInfo" v-model:firstName.trim="firstNameStr" v-model:lastName="lastNameStr">
            <template #[sloatName]>
                <SlotA v-bind="{ fullName }" />
            </template>
            <SlotA v-slot="slotProps"> {{ slotProps.txt }}</SlotA>
        </DeepComponent>
    </div>
</template>
  
<script setup lang="ts">
import { ref, watchEffect, provide } from 'vue';
import DeepComponent from "../components/DeepComponent.vue";
import SlotA from "../components/SlotA.vue";

// > 参数定义
let userInfo = ref({ name: "格兰希尔", age: 18, });
let list = ref([{ name: "语文", code: 0, }, { name: "数学", code: 1, }, { name: "外语", code: 2 }]);
let version = ref(1.01);
console.log("data=>", { userInfo, list });
let fullName = ref("");
let firstNameStr = ref("张三丰");
let lastNameStr = ref("郭襄");

// > 子组件事件监听
let getInfo = (obj: any) => console.log("getInfo=>", obj);
let childEvent = (type: String, ...data: any) => {
    console.log("childEvent=>", { type, data });
    // let sum = data.reduce((before: number, after: number) => before + after, 0);
    version.value = Math.random();
}
// > 监听子组件修改内容
watchEffect(() => {
    fullName.value = firstNameStr.value + lastNameStr.value;
    console.log("watchEffect=>", fullName);
}, {})
// > 插槽名称
let sloatName = ref("sloada");
// > 依赖注入
provide("userInfo", userInfo);

</script>
  
<style></style>
  