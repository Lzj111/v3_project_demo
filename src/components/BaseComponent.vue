<template>
    <div class="base_com">
        基础
        <div>
            defineModel=><input v-model="money" ref="inputRef" /> {{ copyMoney }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watchEffect, watchPostEffect } from 'vue';
// > 字符model
let money = defineModel("money")
let inputRef = ref(null);
let copyMoney: any = ref(0);

let unwatch = watchEffect(() => {
    copyMoney.value = money.value;
}, { flush: "post" })

onMounted(() => {
    console.log("onMounted.inputRef=>", inputRef);
});
onUnmounted(() => {
    console.log("onUnmounted.inputRef=>", inputRef);
    unwatch();
});

</script>

<style scoped lang="scss"></style>