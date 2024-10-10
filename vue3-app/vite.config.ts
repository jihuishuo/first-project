import { defineConfig, UserConfigExport, ConfigEnv, loadEnv } from "vite"; //loadEnv 第一个参数当前开发模式 第二个参数环境变量
// 引入mock插件
import { viteMockServe } from "vite-plugin-mock";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  let env = loadEnv(mode, process.cwd()); //从这里拿环境变量
  return {
    plugins: [
      vue(),
      // 使用mock来操作数据
      viteMockServe({
        localEnabled: command === "serve",
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_APP_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, ""), //连接到后台
        },
      },
    },
  };
};
