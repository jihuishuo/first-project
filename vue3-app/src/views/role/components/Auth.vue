<template>
  <div>
    <el-form
      :model="updateRole"
      ref="roleForm"
      label-width="100px"
      label-position="right"
      style="width: 400px"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="name">
        <el-input
          v-model="updateRole.name"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
    </el-form>
    <!-- 树形控件 -->
    <el-tree
      :data="authList"
      show-checkbox
      node-key="index"
      :default-expand-all="true"
      :default-checked-keys="checkedKeys"
      @check-change="handleCheckChange"
    ></el-tree>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import type Node from "element-plus/es/components/tree/src/model/node";
import menuList from "./../../../config/menuConfg";
import type { roleInfoData } from "./../../../api/role/type";
import { ref, onMounted, reactive } from "vue";
interface Tree {
  index: string;
}
// 接收父组件传输的角色
const props = defineProps(["role"]);

let updateRole: roleInfoData = reactive({
  name: "",
});
const authList = ref([]);
let checkedKeys = reactive<any>([]);
const roleForm = ref<FormInstance>();
// 表单校验
const rules = reactive<FormRules>({
  name: [
    {
      required: true,
      message: "请输入角色名称",
      trigger: "blur",
    },
  ],
});
const getMenus = () => {
  updateRole.menus = checkedKeys;
  return updateRole;
};
// 通过这个把他暴露出去
defineExpose({
  getMenus,
});
const handleCheckChange = (
  data: Tree,
  checked: boolean,
  indeterminate: boolean
) => {
  if (checked) {
    if (data.index != "/students" && checkedKeys.indexOf(data.index) === -1) {
      checkedKeys.push(data.index);
    }
  } else {
    if (checkedKeys.indexOf(data.index) != -1) {
      checkedKeys.splice(checkedKeys.indexOf(data.index), 1);
    }
  }
};

const getAuthNodes = (menuList: any) => {
  return menuList.map((item: any) => {
    if (!item.children) {
      return {
        index: item.index,
        label: item.title,
      };
    } else {
      return {
        index: item.index,
        label: item.title,
        children: getAuthNodes(item.children),
      };
    }
  });
};
onMounted(() => {
  authList.value = getAuthNodes(menuList);
  updateRole = reactive({ ...props.role });
  checkedKeys = [...props.role.menus];
});
</script>

<style></style>
