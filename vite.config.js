import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), "src/assets/static/icons")],
      // 指定symbolId格式
      symbolId: "icon-[dir]-[name]",
      inject: "body-first",
      customDomId: "__svg__icons__dom__",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    exclude: ["node:url"], // 排除 Node.js 模块
  },
  // 在构建时运行脚本
  // build: {
  //   rollupOptions: {
  //     input: "index.html",
  //   },
  //   emptyOutDir: true,
  //   outDir: "dist",
  //   onBeforeBuild: () => {
  //     require("./scripts/generate-routes");
  //   },
  // },
});
