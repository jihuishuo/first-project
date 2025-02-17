<template>
  <div>
    <!-- 条件查询 -->
    <el-form
      :inline="true"
      :model="searchMap"
      style="margin: 20px"
      ref="searchFormRef"
    >
      <el-form-item prop="teacher_id" style="width: 200px">
        <el-select v-model="searchMap.teacher_id" placeholder="根据教师查询">
          <el-option
            v-for="option in teacherOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="manager_id" style="width: 200px">
        <el-select v-model="searchMap.manager_id" placeholder="根据学管查询">
          <el-option
            v-for="option in managerOptions"
            :key="option._id"
            :label="option.name"
            :value="option._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchData">查询</el-button>
        <el-button @click="resetForm(searchFormRef)">重置</el-button>
        <el-button type="primary" @click="handlerAdd">添加班级</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="classes" style="width: 100%; height: 380px" border>
      <!--type="index" 获取索引值，从1开始； label 显示的标题; prop 数据字段名； width 列的宽度 -->
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="classname" label="班级名称"></el-table-column>
      <el-table-column
        label="授课教师"
        prop="teacher_id"
        :formatter="formatTeacher"
      ></el-table-column>
      <el-table-column
        label="学管"
        prop="manager_id"
        :formatter="formatManager"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row._id)">
            编辑
          </el-button>
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页控件 -->
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!-- 添加班级对话框 -->
    <el-dialog v-model="classFormVisible" title="添加班级" width="500px">
      <el-form
        :model="updateClass"
        ref="classFormRef"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        :rules="rules"
      >
        <el-form-item label="班级名称" prop="classname">
          <el-input v-model="updateClass.classname"></el-input>
        </el-form-item>
        <el-form-item label="授课教师" prop="teacher_id">
          <el-select
            v-model="updateClass.teacher_id"
            placeholder="请选择授课教师"
          >
            <el-option
              v-for="option in teacherOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学管" prop="manager_id">
          <el-select v-model="updateClass.manager_id" placeholder="请选择学管">
            <el-option
              v-for="option in managerOptions"
              :label="option.name"
              :value="option._id"
              :key="option._id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button
            type="primary"
            @click="
              updateClass._id == null
                ? addData(classFormRef)
                : updateData(classFormRef)
            "
          >
            确定
          </el-button>
          <el-button @click="classFormVisible = false">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import { ElMessageBox, ElMessage } from "element-plus";
import { ref, reactive, onMounted, nextTick } from "vue";
import type { classInfoData } from "../../api/class/type";

import type { userInfoData } from "../../api/user/type";
import type { roleInfoData } from "../../api/role/type";
import useUserStore from "../../store/modules/user";

let userStore = useUserStore();
import useRoleStore from "../../store/modules/role";
let roleStore = useRoleStore();
import useClassStore from "../../store/modules/types/class";
let classStore = useClassStore();
const classes = ref<classInfoData[] | undefined>([]);

let roleOptions = ref<roleInfoData[] | undefined>([]);
let userOptions = ref<userInfoData[] | undefined>([]);
const teacher_role_id = ref<string | undefined>("");
const manager_role_id = ref<string | undefined>("");
let teacherOptions = ref<userInfoData[]>([]);
let managerOptions = ref<userInfoData[]>([]);

const getRoleList = () => {
  if (roleStore.roles?.length) {
    roleOptions.value = roleStore.roles;
    roleOptions.value?.forEach((item) => {
      if (item.name === "教师") {
        teacher_role_id.value = item._id;
      } else if (item.name === "学管") {
        manager_role_id.value = item._id;
      }
    });
  } else {
    roleStore.roleList().then(() => {
      roleOptions.value = roleStore.roles;
      roleOptions.value?.forEach((item) => {
        if (item.name === "教师") {
          teacher_role_id.value = item._id;
        } else if (item.name === "学管") {
          manager_role_id.value = item._id;
        }
      });
    });
  }
};

const getUserList = () => {
  if (userStore.users?.length) {
    userOptions.value = userStore.users;
    userOptions.value?.forEach((item) => {
      if (item.role_id === teacher_role_id.value) {
        teacherOptions.value.push(item);
      } else if (item.role_id === manager_role_id.value) {
        managerOptions.value.push(item);
      }
    });
  } else {
    userStore.getUserAll().then(() => {
      userOptions.value = userStore.users;
      userOptions.value?.forEach((item) => {
        if (item.role_id === teacher_role_id.value) {
          teacherOptions.value.push(item);
        } else if (item.role_id === manager_role_id.value) {
          managerOptions.value.push(item);
        }
      });
    });
  }
};

const formatTeacher = (
  row: any,
  column: any,
  cellValue: string,
  index: number
) => {
  let teacher =
    teacherOptions?.value?.find((item) => item._id === cellValue) || [];
  return teacher.name;
};
const formatManager = (
  row: any,
  column: any,
  cellValue: string,
  index: number
) => {
  let manager =
    managerOptions?.value?.find((item) => item._id === cellValue) || [];
  return manager.name;
};
const searchFormref = ref<FormInstance>();
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
const searchData = () => {
  currentPage.value = 1;
  getClassList();
};
let updateClass = ref<classInfoData | undefined>({
  _id: null,
  classname: "",
  teacher_id: "",
  manager_id: "",
});
let searchMap = reactive({
  teacher_name: "",
  manager_name: "",
});
const classFormVisible = ref(false);
const classFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  classname: [{ required: true, message: "请输入班级名称", trigger: "blur" }],
  teacher_id: [{ required: true, message: "请选择授课教师", trigger: "blur" }],
  manager_id: [{ required: true, message: "请选择学管", trigger: "blur" }],
});

const handlerAdd = () => {
  classFormVisible.value = true;
  nextTick(() => {
    classFormRef.value.resetFields();
  });
  updateClass.value = {
    _id: null,
    classname: "",
    teacher_id: "",
    manager_id: "",
  };
};
const addData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      classStore
        .addClass(updateClass.value as classInfoData)
        .then((res) => {
          classFormVisible.value = false;
          getClassList();
        })
        .catch((error) => {});
    } else {
    }
  });
};
const currentPage = ref(1);
const pageSize = ref(5);
const total = ref(0);
const totalPage = ref(1);
const handleSizeChange = (val: number) => {
  pageSize.value = val;
  getClassList();
};
const handleCurrentChange = (val: number) => {
  currentPage.value = val;
  getClassList();
};

const getClassList = () => {
  classStore
    .getClassList({ page: currentPage.value, size: pageSize.value, searchMap })
    .then((res) => {
      classes.value = classStore.classes;
      total.value = res?.total as number;
      totalPage.value = total.value / pageSize.value;
    });
};
const handleEdit = (_id: string) => {
  handlerAdd();
  classStore.getClassById(_id).then((res) => {
    updateClass.value = res;
  });
};
const updateData = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      classStore
        .updateClass(updateClass.value as classInfoData)
        .then((res) => {
          classFormVisible.value = false;
          getClassList();
        })
        .catch((error) => {});
    } else {
    }
  });
};

const handleDelete = (_id: string) => {
  ElMessageBox.confirm("是否确认删除该班级?", "Waring", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      classStore.deleteClass(_id).then((res) => {
        getClassList();
        ElMessage.success({ type: "success", message: "删除成功" });
      });
    })
    .catch(() => {});
};

onMounted(() => {
  getRoleList();
  getUserList();
  getClassList();
});
</script>

<style></style>
