<template>
  <div class="navbar">
    <!-- 菜单 -->
    <el-menu
      background-color="#545c64"
      text-color="#fff"
      :router="true"
      :default-openeds="['/students']"
      default-active="$route.path"
      active-text-color="#ffd04b"
    >
      <Menu :menuList="menuNodes"></Menu>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import Menu from "./menu/index.vue";
import menuList from "./../../config/menuConfg";
import type { MenuDate, MenuChildrenDate } from "./types/types";
import useUserStore from "./../../store/modules/user";
let useStore = useUserStore();
import { useRoute } from "vue-router";
const $route = useRoute();
// 用户
const hashAuth = (item: MenuDate) => {
  // 结构出来我想要的
  // index 权限
  // isPublic 公开的
  // menus 用户拥有的权限
  // username 用户名
  const { index, isPublic } = item;
  // 通过角色列表获取权限
  const menus = useStore.user?.role.menus;
  // 当前的用户是谁
  const username = useStore.user?.username;
  // 超级管理员有所有权限

  if (username === "admin" || isPublic || menus?.indexOf(index) != -1) {
    return true;
  } else if (item.children) {
    return !!item.children.find(
      (child: MenuChildrenDate) => menus.indexOf(child.index) != -1
    );
  } else {
    return false;
  }
};
let menuNodes: any[] = [];
const getMenuNodes = () => {
  menuList.forEach((item) => {
    if (!item.children) {
      if (hashAuth(item)) {
        menuNodes.push(item);
      }
    } else {
      let tempArr = [];
      item.children.forEach((i) => {
        if (hashAuth(i)) {
          tempArr.push(i);
        }
      });
      let obj = { ...item, children: tempArr };
      menuNodes.push(obj);
    }
  });
};
getMenuNodes();
</script>

<style scoped>
.el-menu {
  border: 0;
  height: 100%;
}
</style>
