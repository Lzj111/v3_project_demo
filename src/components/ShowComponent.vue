<template>
    <div>很小的一个组件</div>
    <button @click="countClick(); btnClick($event);" ref="btn">加{{ count }}</button>
    <div>
        Ref:{{ getListSize }}
        <span v-for="(item, index) in likes" :key="index">{{ item }}</span>
    </div>
</template>
<script setup lang="ts">
import { ref, defineProps, defineEmits, type PropType, type Ref, computed, type ComputedRef } from 'vue';

// > props运行时声明
interface Stu {
    age: Number,
    like: Array<String>
}
let props = defineProps({
    name: { type: String, default: "--", required: false },
    age: Object as PropType<Stu>,
});
// // > 基于类型声明
// let props1 = defineProps<{
//     name?: string,
//     age?: number
// }>();
// // > 基于类型和运行时
// let props2 = withDefaults(defineProps<{
//     name?: string,
//     age?: number
// }>(), {
//     name: "张三",
//     age: 18,
// });

// > 为emit标注类型
// >> 运行时
const emits1 = defineEmits(["aa", "bb"]);
// // >> 基于选项
// const emits2 = defineEmits({
//     cc: (id: number) => { },
//     dd: (name: string) => { }
// });
// // >> 基于类型
// const emits3 = defineEmits<{
//     (e: "ee", id: number): void,
//     (e: "ff", name: string): void
// }>();
// // >> 3.3
// const emits4 = defineEmits<{
//     gg: [id: number],
//     hh: [name: string]
// }>();
console.log("ShowComponent=>", props.name)

// > 为ref标注类型
let count = ref(0);
let countClick = () => count.value++;
let likes: Ref<Array<String | Number>> = ref(["zhangsan", 1, "王五"])
console.log("likes=>", likes);
let year: Ref<Number | String> = ref(2020);
year.value = "2001";

// > 为computed标注类型
let getListSize: ComputedRef<number> = computed<number>(() => {
    return likes.value.length;
})

// > 为函数标注类型
let btnClick: Function = (event: Event): void => {
    console.log("btnClick.event=>", event);
}

// > 为html模版标注类型
let btn: Ref<HTMLButtonElement | null> = ref<HTMLButtonElement | null>(null);

</script>
<style scoped lang="scss"></style>