import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

import { message } from "ant-design-vue";
import "ant-design-vue/es/message/style/css";
import "ant-design-vue/es/modal/style/css";

import "virtual:svg-icons-register";
import SvgIcon from "@/components/Svg.vue";

import mitt from "mitt";

const app = createApp(App);

//挂载全局对象
app.config.globalProperties.$message = message;
// app.config.globalProperties.$Modal = Modal;

//挂载全局事件总线 兄弟之间通信
app.config.globalProperties.$bus = mitt();

app.component("SvgIcon", SvgIcon);

app.mount("#app");

app.config.devtools = true;
