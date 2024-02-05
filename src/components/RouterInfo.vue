<template>
    <div class="rinfo">
        router_info.params=> {{ params }}
    </div>
</template>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

const uRoute = useRoute();
let params: Ref<string> = ref(JSON.stringify(uRoute.params));

</script>
<style scoped lang="scss">
.rinfo {
    width: 100%;
    height: 100%;
    background-color: #ffcbbb;
    padding: 10px;
    box-sizing: border-box;
}
</style>