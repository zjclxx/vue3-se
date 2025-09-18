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
    host: "0.0.0.0",
    open: true, // 项目启动后，自动打开
    warmup: {
      //预热加载
      clientFiles: ["./index.html", "./src/{views,components}/*"],
    },
  },
  // output.entryFileNames
  // 用途：定义入口chunk（即你的主JavaScript文件，如main.js或index.js等）的输出文件名和路径。
  // 解释：这里[name]会被替换为入口chunk的名称，[hash]是一个根据内容生成的哈希值，确保每次内容变化时文件名也会改变，便于浏览器缓存管理。所有入口chunk将被放置在assets/js/目录下。
  // output.chunkFileNames
  // 用途：定义由代码拆分（code splitting）产生的非入口chunk（例如动态导入的模块）的输出文件名和路径。
  // 解释：与entryFileNames类似，但应用于代码拆分生成的文件。这样设置可以保持与入口文件一致的命名规则，同样带有哈希值，存储位置也是assets/js/。
  // output.assetFileNames
  // 用途：定义静态资源（如CSS、图片等）的输出文件名和路径。
  // 配置函数：这里使用了一个函数来动态决定不同类型的资源输出到哪里。
  // 对于.css文件，输出到assets/css/[name]-[hash].css。
  // 对于常见的图片格式（.png, .jpg, .jpeg, .gif, .svg, .webp），输出到assets/img/[name]-[hash].[ext]，其中[ext]保留原始文件扩展名。
  // 其他未匹配到的静态资源则输出到assets/[name]-[hash].[ext]
  build: {
    chunkSizeWarningLimit: 4096,
    rollupOptions: {
      output: {
        // 人口文件输出配置
        entryFileNames: "assets/js/[name].[hash].js",
        // 代码分割后的文件输出配置
        chunkFileNames: "assets/js/[name].[hash].js",
        // 静态资源输出配置
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split(".").at(1);
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return `assets/img/[name].[hash].[ext]`;
          } else if (/css/i.test(extType)) {
            return `assets/css/[name].[hash].[ext]`;
          } else {
            return `assets/[name].[hash].[ext]`;
          }
        },
        manualChunks: {
          vue: ["vue"],
          antd: ["ant-design-vue", "@ant-design/icons-vue"],
          // lodash: ['loadsh-es'],
        },
      },
    },
  },
  css: {
    preprocessorOptions: {
      // 如果'modern-compiler'不管用，可换成"modern"
      scss: {
        api: "modern-compiler", // or "modern"
        silenceDeprecations: ["legacy-js-api"], // 重点：解决sass警告问题
        javascriptEnabled: true,
      },
    },
  },
});
