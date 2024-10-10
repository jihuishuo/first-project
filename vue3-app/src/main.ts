import { createApp } from "vue";
import App from "./App.vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import { zhCn } from "element-plus/es/locales.mjs";

import * as ElomentPlusIconVue from "@element-plus/icons-vue";
import axios from "axios";
import router from "./router";
import pinia from "./store";
import "./permission";

// 通过它来获取值
axios({
  // 请求全局的mock
  url: "/mock/login",
  method: "post",
  data: {
    username: "test1",
    password: "123456",
  },
});

const app = createApp(App);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(router);
// 使用pinia仓库
app.use(pinia);
for (const [key, component] of Object.entries(ElomentPlusIconVue)) {
  app.component(key, component);
}
app.mount("#app");
//引入ElomentPlus，现在可以直接在网上找的资源，复制进组件
