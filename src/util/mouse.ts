// mouse.ts

import { ref, onMounted, onUnmounted, toValue } from 'vue';
import { useEventListener } from "./event";

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
    let x = ref(0);
    let y = ref(0);

    useEventListener(window, "mousemove", (event) => {
        x.value = toValue(event.pageX);
        y.value = toValue(event.pageY);
    })

    return { x, y }
}