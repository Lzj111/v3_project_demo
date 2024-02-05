<template>
  <div class="main">
    <div class="nav">
      <template v-for="item in menuList" :key="item.title">
        <RouterLink class="nav_item flex_center_all" :to="item.name" :class="{ 'acitve': activeNav(item.path) }">
          {{ item.title }}
        </RouterLink>
      </template>
    </div>
    <div class="content">
      <RouterView />
      <RouterView name="left" />
      <RouterView name="right" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

// > 路由数据
import list from "./router/RouterConfig";
let menuList = ref(list);

// > 路由实例
let uRoute: any = useRoute();
// > 选中当前导航
let activeNav = computed(() => {
  return (active: string) => {
    // return uRoute.path == active;
    return active == "/" ? uRoute.path == active : uRoute.path.indexOf(active) >= 0;
  }
});

// > 监听路由变化
watch([() => uRoute.path, () => uRoute.params], ([nPath, nParams], [oPath, oParams]) => {
  console.log("app.route.watch=>", { nPath, oPath, nParams, oParams });
});

</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  box-sizing: border-box;

  .nav {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    background: #f7f6f7;

    .nav_item {
      padding: 10px 24px;
      margin-right: 10px;
    }

    .acitve {
      background: #6a89ff;
      color: #ffffff;
    }
  }

  .content {
    width: 100%;
    height: auto;
    flex: 1;
    display: flex;
    flex-direction: row;
    height: 100%;
  }
}
</style>
