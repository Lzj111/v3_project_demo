// il8n.ts

export default {
    install: (app, options) => {
        // >> 注入一个全局可用的$translate()方法
        app.config.globalProperties.$translate = (key) => {
            // >> 获取"options"对象的深层属性
            // >> 使用key作为索引
            return key.split(".").reduce((o, i) => {
                if (o) return o[i];
            }, options)
        }
        app.provide('il8n', options)
    }
}