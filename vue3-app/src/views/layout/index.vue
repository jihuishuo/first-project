<template>
  <div>
    <!-- 头部 -->
    <app-header class="header"></app-header>
    <!-- 左侧导航区域 -->
    <app-navbar class="navbar"></app-navbar>
    <!-- 右侧主区域 -->
    <app-main class="main"></app-main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from "./../../components/AppHeader/index.vue";
import AppNavbar from "./../../components/AppNavbar/index.vue";
import AppMain from "./../../components/AppMain/index.vue";
</script>

<style scoped>
.header {
  position: absolute;
  line-height: 50px;
  padding: 0;
  top: 0;
  left: 0;
  right: 0;
  background: #5cee26;
}
.navbar {
  position: absolute;
  width: 230px;
  top: 50px;
  left: 0;
  bottom: 0;
  overflow-y: auto; /* 上下滚动 */
  background: #e4f529;
}
.main {
  position: absolute;
  top: 50px;
  left: 230px;
  right: 0;
  bottom: 0;
  padding: 10px;
  overflow-y: auto;
  background: rgb(41, 233, 227);
}
</style>
