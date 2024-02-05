<template>
    <div class="es6">
        es6.params=>{{ query }}
        <div>
            天气=> <span v-for="(item, index) in weatherList" :key="index" ref="spans">{{ item + " " }} </span>
        </div>
        <div>
            <label>v-bind:money=>金额：{{ money }}</label>
            <BaseComponent v-model:money="money" />
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import BaseComponent from '../components/BaseComponent.vue';

let weatherList: Ref<Array<String>> = ref(["晴天", "阴天", "雨天", "雪天"]);

let uRoute = useRoute();
const query = uRoute.query, params = uRoute.params;
console.log("route=>", { query, params });
let money = ref(789.54);
// > 
let spans: Ref<Array<HTMLSpanElement>> = ref([]);
onMounted(() => {
    console.log("onMounted.spans=>", spans);
});

</script>
<style scoped lang="scss">
.es6 {
    width: 100%;
    height: 100%;
    background-color: #f1fff2;
    padding: 10px;
    box-sizing: border-box;
}
</style>