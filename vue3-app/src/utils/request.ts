// 封装axios对象 通过..拦截
import axios from "axios";
// 创建一个消息   ElLoading加载
import { ElMessage, ElLoading } from "element-plus";
const loading = {
  loadingInstance: null,
  open() {
    if (this.loadingInstance == null) {
      this.loadingInstance = ElLoading.service({
        text: "拼命加载中...",
        background: "rgba(0, 0, 0, 0.8)",
        target: ".main",
      });
    }
  },
  close() {
    if (this.loadingInstance != null) {
      this.loadingInstance.close();
    }
    this.loadingInstance = null;
  },
};
// 创建一个request创建一个对象
import useUserStore from "../store/modules/user";

let request = axios.create({
  // baseURL: "mock",
  baseURL: import.meta.env.VITE_APP_BASE_API, //替换真实地址   改的是请求接口
  // 时间
  timeout: 5000,
});
const getMenus = () => {
  let userStore = useUserStore();
  const roleId = userStore.user?.role_id;
  const userMenus = userStore.user?.role?.menus;
  if (userStore.user?.username === "admin") {
    return;
  }
  request({
    url: "/menus",
    method: "post",
    data: {
      roleId,
    },
  }).then((response) => {
    const resp = response;
    if (resp.status === 0) {
      const menus = resp.data.menus;
      if (userMenus?.length === menus.length) {
        if (menus.indexOf(item) === -1) {
          userStore.removeUser();
          ElMessage({
            message: "当前用户权限已修改,请重新登陆",
            type: "waring",
          });
          window.location.href = "/login";
        }
      } else {
        userStore.removeUser();
        ElMessage({
          message: "当前用户权限已修改,请重新登陆",
          type: "warning",
        });
        window.location.href = "/login";
      }
    }
  });
};
// 创建一个拦截器
request.interceptors.request.use(
  (config) => {
    if (config.url != "menus" && config.url != "/login") {
      //
      loading.open();
      getMenus();
    }
    return config;
  },
  (error) => {
    loading.close();
    return Promise.reject(error);
  }
);
// 响应
request.interceptors.response.use(
  (response) => {
    loading.close();
    // 目的要这个数据
    return response.data;
  },
  // 错误的信息
  (error) => {
    loading.close();
    // 创建一个空的
    let msg = "";
    // 获取到状态码 401 token过期 403 ���有权限 404 地址错误 500 服务器内部错误 其余的就是无网络
    let status = error.response.status;
    switch (status) {
      case 401:
        msg = "token过期";
        break;
      case 403:
        msg = "无访问权限";
        break;
      case 404:
        msg = "请求的地址错误";
        break;
      case 500:
        msg = "服务器发生了内部错误";
        break;
      default:
        msg = "无网络";
    }
    // 通过ElMessage的错误信息
    ElMessage.error({
      type: "error",
      message: msg,
    });
    return Promise.reject(error);
  }
);
// 导出错误信息
export default request;
