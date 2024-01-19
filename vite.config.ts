/*
 * @Author: 郑永楷
 * @LastEditors: 郑永楷
 * @Description: file content
 */
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import { createHtmlPlugin } from "vite-plugin-html";
// import { viteMockServe } from "vite-plugin-mock";

export default defineConfig(({ command, mode }) => {
  const config = loadEnv(mode, "./");
  return {
    base: config.VITE_APP_BASE_URL,
    server: {
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      createHtmlPlugin({
        inject: {
          data: {
            title: config.VITE_APP_TITLE,
            MapApi: config.VITE_APP_MAPAPI,
          },
        },
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), "src/assets/svg")],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    resolve: {
      alias: {
        // 这里就是需要配置resolve里的别名
        "@": path.join(__dirname, "./src"), // path记得引入
      },
    },

    build: {
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: [],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            react: "React",
            "react-dom": "react-dom",
          },
        },
      },
    },
  };
});
