// 路由守备
import router from "./router";
import pinia from "./store"; //pinia仓库
import useUserStore from "./store/modules/user";
let useStore = useUserStore(pinia);
router.beforeEach((to, from, next) => {
  const user = useStore.user; //获取用户
  // 如果有token并且token不为空，就跳转到首页，如果没有token或者token为空，就跳转到登录页
  if (user && user._id) {
    if (to.path === "/login") {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});
