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
  build: {
    outDir: "docs",
    rollupOptions: {
      output: {
        name: "docs",
        // 控制 JS 文件（包括入口文件和动态导入的块）
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",

        // 控制静态资源（CSS、图片、字体等）
        assetFileNames: ({ name }) => {
          if (/\.css$/.test(name)) {
            return "css/[name].[ext]"; // CSS 文件放到 css/ 目录
          }
          if (/\.(png|gif|svg|ico|woff2?|eot|ttf|otf)$/.test(name)) {
            return "other/[name].[ext]"; // 其他静态资源放到 other/ 目录
          }
          if (/\.(jpg|jpeg|webp)$/.test(name)) {
            return "assets/static/imgs/[name].[ext]";
          }
          return "[name].[ext]"; // 默认处理（理论上不会用到）
        },
      },
    },
  },
  base: process.env.NODE_ENV === "production" ? "/gsap-example" : "/",
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
