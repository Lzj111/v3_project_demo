<template>
    <div class="home_con">
        <div class="con_titie">{{ titie }}</div>
        <button @click="countSum">计数:{{ count }}</button>
        <div v-bind:id="`123` + bindId" v-html="htmlIn"></div>
        <!-- ref对象绑定 -->
        <div>
            {{ teacher.name }} {{ teacher.age }}
            <button @click="teAdd">年龄增加</button>
        </div>
        <!-- reactive对象绑定区域 -->
        <div>
            测试对象绑定=>reactive(any) 1、解构后不响应 2、直接替换后失去响应链接
            {{ student.name }} {{ student.age }} {{ student.address }}
            <button @click="ageAdd">年龄增加</button>
        </div>
        <!-- 计算属性 -->
        <div>
            作者{{ author.name }} 图书的数量 {{ getBooksSize }} {{ now }}
            <button @click="addBook">加书</button>
            <span v-for="item in author.books" :key="item">{{ item }}</span>
            {{ fullName }}
        </div>
        <!-- class&style -->
        <span :class="{ 'acitve': isActive }" @click="isActive = !isActive">class选中</span>
        <span :style="styleObj">style绑定</span>
        <!-- 对象绑定 -->
        对象绑定
        <span v-for="(value) in myObject">{{ value + " " }}</span>
        <!-- 事件处理 -->
        <ChildComponent v-on:childClick="childClick" ref="childComponentIns"></ChildComponent>
        <ChildComponent @some-event="someEvent" :dataList="dList"></ChildComponent>
        <!-- 表单输入绑定 -->
        <input v-model.lazy="teacher.name" ref="refTeacherName" />
        <!-- 侦听器 -->
        <input v-model.trim.lazy="phone" ref="refPhone" />
        <!-- 模版数组 -->
        <div>
            <span v-for="item in list" ref="refList">{{ item }}</span>
        </div>
        <!-- ref绑定事件 -->
        <input v-model="comName" :ref="(el) => conNameChange(el)" />
        <button @click="callChild">调用子组件</button>
    </div>
</template>
  
<script setup lang="ts">
import {
    ref, nextTick, reactive, computed, onMounted, onUnmounted, watch,
    watchEffect, watchPostEffect,
} from 'vue';

//#region 模版数组
let refList = ref([]);
let list = ref(["1", "2", "3", "4", "5"]);
nextTick(() => {
    console.log(`refList ${refList.value}`)
});
let comName = ref("北京力争");
let conNameChange = (el: any) => {
    console.log("conNameChange", el?.value);
}
let childComponentIns = ref(null);

//#endregion

//#region 侦听器
let phone = ref("18201347377")
watch(phone, (nv, ov) => {
    console.log("watch.phone=>", nv, ov);
})
// > 不能直接监听value, 需要提供一个函数
watch([() => phone.value + 1], ([nv], [ov]) => {
    console.log("watch.phone.value=>", nv, ov);
})
// watchEffect(async () => {
//   const response = await fetch(
//     `https://sapi.k780.com/?app=time.world&city_en=new-york&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json`
//   )
//   let res = await response.json();
//   phone.value = res.msgid;
//   console.log("watchEffect.phone.value", phone.value);
// }, { flush: "post" })
//#endregion

//#region 生命周期
onMounted(() => {
    console.log("onMounted...");
    console.log(`childComponentIns=>`, childComponentIns);
});
onUnmounted(() => {
    console.log("onUnmounted...");
})
//#endregion

//#region 事件处理
import ChildComponent from "../components/ChildComponent.vue";
let childClick = () => console.log("父组件收到了");
let someEvent = (da: any) => console.log("$emit.父组件", da);
let callChild = () => {
    let { cData1, cClick }: any = childComponentIns.value;
    console.log("callChild", { cData1, cClick });
    cClick(1);
}
let dList = reactive(["张三", "李四", "王五"]);
//#endregion

//#region 对象绑定
const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})
//#endregion

//#region class&style绑定
let isActive = ref(true);
let styleObj = reactive({ "color": "red", "font-size": "25px", });

//#endregion

//#region // > 计算属性
let author = reactive({
    name: "叶经理",
    books: ['Vue 2 - Advanced Guide', 'Vue 3 - Basic Guide', 'Vue 4 - The Mystery']
});
// >> 异步调用需要手动停止监听器
let refTeacherName = ref(null);
let unWatch = watchEffect(() => {
    author.name = phone.value;
    console.log("watchEffect.author.name", author.name)
});
unWatch();

let refPhone = ref(null);
// 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()：
watchPostEffect(() => {
    author.name = phone.value;
    console.log("watchPostEffect.author.name", author.name, refPhone.value)
});
let getBooksSize = computed(() => author.books?.length);
let addBook = () => author.books.push("三体-刘慈欣");
let now = computed(() => Date.now());
const firstName = ref("张三"), lastName = ref("李四");
const fullName = computed({
    get() {
        return `${firstName.value} ${lastName.value}`
    }, set(newVal) {
        [firstName.value, lastName.value] = newVal.split(" ");
    }
});
fullName.value = '马里奥 佩奇'; // 避免更改计算属性
//#endregion

//#region // > 基础绑定
let titie = "测试基本语法";
let htmlIn = "<h3>这是一串html模板</h3>";
let bindId = "bind_id_code";
let count = ref<number>(0);
async function countSum() {
    count.value += 1;
    nextTick();
    console.log("nextTick after");
}
//#endregion

//#region // > ref obj
let teacher = ref({
    name: "李四",
    age: 35,
})
let { value } = teacher;
let teAdd = () => value.age++;
//#endregion

//#region // > reactive
let student = reactive({
    name: "张三",
    age: 18,
    address: "湖北武汉"
});
console.log("reactive(student) === student:", reactive(student) === student) // true
let ageAdd = () => student.age++;
//#endregion

//#region // > ref reactive解包问题
const books = reactive([ref("vue3guide")]);
console.log(books[0].value)
const maps = reactive(new Map([["count", ref(0)]]))
console.log(maps.get("count")?.value)
const idr = { id: ref(1) }
const { id } = idr;
console.log(id, idr);
//#endregion

</script>
  
  <!-- <script lang="js">
  import { ref } from 'vue';
  export default {
    setup() {
      let count = ref(0)
      let countSum = () => {
        count.value += 1;
      }
      return {
        count,
        countSum
      }
    }
  }
  </script> -->
  
<style scoped lang="scss">
.home_con {
    .acitve {
        color: red;
    }

}
</style>