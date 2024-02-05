<template>
    <div>-----------------------------------</div>
    <div v-bind="$attrs" class="inner-com">
        深入组件
        <div>用户信息=> {{ props.userInfo?.name }} age{{ props.userInfo?.age }} version{{ cale }} {{ version }}</div>
        <div>列表数据=> <span v-for="item in list" :key="item.code">{{ item.name + "\t" }}</span></div>
        <div>是否弹出：{{ isPop }}</div>
        <div>子组件点击
            <button @click="$emit('emitBtn', 'emit方式')">emit方式</button>
            <button @click="btnClick">defineEmits方式</button>
        </div>
        <div>
            model绑定
            <input v-model.lazy="firstName" v-focus:text="123" v-color="'green'" />
            <input v-model.lazy="lastName" v-color="'red'" />
        </div>
        <div>模板插槽=>
            <slot name="sloada">插槽默认内容</slot>
            <slot :txt="firstName">插槽默认内容B</slot>
        </div>
        <div>
            异步组件=>
            <ShowComponent />
        </div>
        <div>
            鼠标位置=> {{ x }} : {{ y }}
        </div>
        <!-- <div>插件=>{{ $translate('greetings.hello') }} {{ $translate('greetings.tool') }}</div> -->
        <div>动画=> <button @click="toggleClick">点我切换</button>
            <Transition v-show="toggle">
                <SlotA></SlotA>
            </Transition>
        </div>
        <div>
            动态组件=><button @click="dyClick">切换</button>
            <KeepAlive>
                <component :is="current"></component>
            </KeepAlive>
        </div>
        <div>
            Teleport=><button @click="open = !open">Teleport切换</button>
            <Teleport to="body">
                <div v-if="open" class="app1">
                    <p>Hello from the modal!</p>
                    <button @click="open = false">Close</button>
                </div>
            </Teleport>
        </div>
    </div>
</template>
<script setup lang="ts">
import {
    ref, computed, defineModel, defineOptions, useAttrs,
    defineAsyncComponent, shallowRef, type Ref
} from 'vue';

import SlotA from './SlotA.vue';
import { useMouse } from '../util/mouse';

defineOptions({ inheritAttrs: true })
// =================================================
let props = defineProps({
    userInfo: [Object],
    list: Array<{ code: number, name: String }>,
    version: [Number],
    likes: {
        type: Array<Number>,
        default: [18],
        required: false,
    },
    // Boolean优先级大 除非String在Boolean前面
    isPop: [Boolean, String],
});
console.log("props", props);
let ver = ref(props.version);
let cale = computed(() => (ver.value ? ver.value * 2 : 0), {
    onTrack(e) {
        console.log("computed.onTrack.e=>", e);
    },
    onTrigger(e) {
        console.log("computed.onTrigger.e=>", e);
    },
});
// >> 子父组件消息通信
let events = defineEmits({
    emitBtn: Object,
    userInfo: ({ idcard, name }) => {
        if (idcard && name) {
            return true;
        } else {
            console.warn("idcard和name不能为空");
            return false;
        }
    }
});
let btnClick = () => {
    events("emitBtn", "defineEmits方式");
    events("userInfo", { idcard: "420057788585", name: "张三" });
}
// > model 父子组件双向绑定 firstName.value = "12";
const firstName = defineModel("firstName");
const lastName = defineModel("lastName");
// > 穿透useAttrs
const attr = useAttrs();
console.log("useAttrs=>", attr);
// > 异步组件
let ShowComponent = defineAsyncComponent(() => {
    return import("./ShowComponent.vue");
    // return new Promise((resolve, reject) => {
    //     // > 重服务端获取组件
    //     setTimeout(() => {
    //         resolve();
    //     }, 1000);
    // })
});
// > 组合式函数
let { x, y } = useMouse();
// > 自定义指令
let vFocus = {
    mounted: (el: any, binding: any, vnode: any, prevNode: any) => {
        console.log("vFocus.mounted=>", { el, binding, vnode, prevNode });
        el.focus();
    }
}
// > 动画
let toggle = ref(true);
let toggleClick = () => {
    toggle.value = !toggle.value;
}
// > 动态组件
const current: Ref = shallowRef(SlotA)
let dyClick = () => {
    current.value = current.value == SlotA ? ShowComponent : SlotA;
}
// > Teleport 传送
let open = ref(false);

</script>
<style scoped lang="scss">
/* 下面我们会解释这些 class 是做什么的 */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>