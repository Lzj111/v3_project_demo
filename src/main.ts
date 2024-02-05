import { createApp } from 'vue'
import './style.scss'
import App from './App.vue'

import router from "./router/Index"
import { createPinia } from 'pinia'
import eventBus from "vue3-eventbus"

const app = createApp(App);
app.use(router);
const pinia = createPinia();
app.use(pinia);
app.use(eventBus);
app.mount('#app');

// > 插件
import i18n from './util/i18n'
app.use(i18n, {
    greetings: {
        hello: "你好",
        tool: "工具",
    }
})
app.provide("uInfo", { name: "叶凡", age: 180000, address: "北斗" });
// > 自定义指令
app.directive("color", (el: any, binding: any) => { el.style.color = binding.value; });