import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";
//ant-design-vue按需引入
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
//样式自动引入
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from "vite-plugin-style-import";
//压缩插件
import viteCompression from "vite-plugin-compression";

//svg组件
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

import { resolveStyle } from "./src/plugins/resolveStyle";

// import GLOBAL_CONFIG from "./src/config/index.js";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    Components({
      //ant-design-vue   importStyle = false 样式就没了
      resolvers: [
        AntDesignVueResolver({ importStyle: "css", resolveIcons: true }),
      ],
    }),
    //配置svg全局可用
    createSvgIconsPlugin({
      iconDirs: [path.resolve("./src/assets/svg")],
      symbolId: "icon-[dir]-[name]",
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      libs: [
        {
          libraryName: "ant-design-vue",
          esModule: true,
          resolveStyle: (name) => resolveStyle(name),
        },
      ],
    }),
    viteCompression({
      verbose: true, //打印压缩日志
      disable: false, //禁用压缩(开启打包服务时)
      threshold: 10240, //压缩阈值 大于10kb
      algorithm: "gzip", //使用gzip
      ext: ".gz", //生产文件后缀
    }),
    viteCompression({
      verbose: true, //打印压缩日志
      disable: false, //禁用压缩(开启打包服务时)
      threshold: 10240, //压缩阈值 大于10kb
      algorithm: "brotliCompress", //使用Brotli压缩
      ext: ".br", //生产文件后缀
    }),
  ],
  server: {
    // proxy: {
    //   [GLOBAL_CONFIG.BASE_PROXY_URL]: {
    //     target: GLOBAL_CONFIG.BASE_API,
    //     changeOrigin: true,
    //     ws: true,
    //     rewrite: (path) =>
    //       path.replace(new RegExp(`^${GLOBAL_CONFIG.BASE_PROXY_URL}`), ""),
    //     // only https
    //     // secure: false
    //   },
    // },
    open: true, // 项目启动后，自动打开
    warmup: {
      clientFiles: ["./index.html", "./src/{views,components}/*"],
    },
  },
  build: {
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ["vue"],
          antd: ["ant-design-vue", "@ant-design/icons-vue"],
          // lodash: ['loadsh-es'],
        },
      },
    },
  },
});
