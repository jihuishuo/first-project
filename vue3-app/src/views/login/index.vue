<template>
  <div class="login-container">
    <!-- ref 相当于 id，:model 表单数据对象, label-width 表单域标签的的宽度 -->
    <!--rules 表单验证规则  -->
    <el-form
      ref="ruleFormRef"
      :model="form"
      label-width="80px"
      class="login-form"
      :rules="rules"
    >
      <!-- 里外的规则必须一致 -->
      <h2 class="login-title">登录</h2>
      <!-- prop -->
      <el-form-item label="帐号" prop="username">
        <el-input v-model="form.username" placeholder="请输入帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="form.password"
          placeholder="请输入密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// FormInstance, FormRules 验证规则
import { FormInstance, FormRules } from "element-plus";
import { useRouter } from "vue-router";
let $router = useRouter(); //获取router实例
import useUserStore from "./../../store/modules/user";
let useStore = useUserStore();
import { ElMessage } from "element-plus";
// 定义表单的响应式数据
const form = reactive({
  username: "",
  password: "",
});
// 验证规则  使用ref创建一个响应式的表单实例引用
const ruleFormRef = ref<FormInstance>();
//// 用户名验证规则 rule 规则  value值  callback回调
const validateUserName = (rule: any, value: any, callback: any) => {
  value = value.trim();
  const length = value && value.length; //先有值再有长度
  const pwdReg = /^[a-zA-Z0-9_]+$/;
  if (value === "") {
    callback(new Error("请输入新的账号")); // 空值错误
  } else if (length < 4 || length > 12) {
    callback(new Error("账号长度4-12位之间")); // 长度错误
  } else if (!pwdReg.test(value)) {
    callback(new Error("账号只能包含字母、数字和下划线")); // 格式错误
  } else {
    callback(); // 无错误时调用callback
  }
};
// 定义表单的验证规则
const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      validator: validateUserName,
      // 校验 失去焦点 发生改变
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      message: "请输入你的密码",
      trigger: ["blur", "change"],
    },
  ],
});
const onSubmit = (formEl: FormInstance | undefined) => {
  if (!formEl) return;

  formEl.validate(async (valid) => {
    if (valid) {
      try {
        // 调用用户状态管理中的登录函数
        await useStore.userLogin(form);
        // 登录成功后跳转到首页
        $router.push("/");
        ElMessage({
          type: "success",
          message: "登录成功",
        });
      } catch (error) {
        ElMessage({
          type: "error",
          message: (error as Error).message,
        });
      }
    } else {
      console.log("Error submit");
      return false;
    }
  });
};
// export default {

// }
</script>

<style scoped>
.login-form {
  width: 350px;
  margin: 160px auto;
  background: rgb(255, 255, 255, 0.8);
  padding: 30px;
  border-radius: 20px;
}
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("./../../assets/43674af4f37e2e5bb7049c2eddc7136.jpg");
  overflow: hidden;
}
.login-title {
  text-align: center;
  color: #333;
}
</style>
