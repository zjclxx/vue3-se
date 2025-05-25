import axios from "axios";

import GLOBAL_CONFIG from "@/config/index.js";

import { tansParams } from "./index.js";
import cache from "@/plugins/cache";
import errorCode from "./errorCode.js";
import { message as AMessage } from "ant-design-vue";

//  创建axios实例
const service = axios.create({
  baseURL: GLOBAL_CONFIG.BASE_API, //不代理
  // baseURL: GLOBAL_CONFIG.BASE_PROXY_URL,//代理
  timeout: 5000,
});

// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么，比如添加token
    // if (localStorage.getItem('token')) {
    //   config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    // }
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false;
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }
    //   防重复提交
    if (
      !isRepeatSubmit &&
      (config.method === "post" || config.method === "put")
    ) {
      const requestObj = {
        url: config.url,
        data:
          typeof config.data === "object"
            ? JSON.stringify(config.data)
            : config.data,
        time: new Date().getTime(),
      };
      const sessionObj = cache.session.getJSON("sessionObj");
      if (
        sessionObj === undefined ||
        sessionObj === null ||
        sessionObj === ""
      ) {
        cache.session.setJSON("sessionObj", requestObj);
      } else {
        const s_url = sessionObj.url; // 请求地址
        const s_data = sessionObj.data; // 请求数据
        const s_time = sessionObj.time; // 请求时间
        const interval = 1000; // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          // const message = '数据正在处理，请勿重复提交';
          // console.warn(`[${s_url}]: ` + message)
          return Promise.reject();
        } else {
          cache.session.setJSON("sessionObj", requestObj);
        }
      }
    }

    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    let code = 200;
    // console.log("res.data.code", res.data.code);
    if (res.data.code) {
      if (res.data.code == 0 || res.data.code == 200) {
        code = 200;
      } else {
        code = res.data.code;
      }
    } else {
      code = 200;
    }
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode["default"];
    // 二进制数据则直接返回
    if (
      res.request.responseType === "blob" ||
      res.request.responseType === "arraybuffer"
    ) {
      return res.data;
    }
    if (code == 401) {
      // if (!isRelogin.show) {
      //   isRelogin.show = true;
      //   MessageBox.confirm(
      //     "登录状态已过期，您可以继续留在该页面，或者重新登录",
      //     "系统提示",
      //     {
      //       confirmButtonText: "重新登录",
      //       cancelButtonText: "取消",
      //       type: "warning",
      //     }
      //   )
      //     .then(() => {
      //       isRelogin.show = false;
      //       // store.dispatch('LogOut').then(() => {
      //       removeToken();
      //       location.href = "/index";
      //       // })
      //     })
      //     .catch(() => {
      //       isRelogin.show = false;
      //     });
      // }
      return Promise.reject("无效的会话，或者会话已过期，请重新登录。");
    } else if (code == 500) {
      AMessage.error(msg);
      return Promise.reject(new Error(msg));
    } else if (code != 200) {
      AMessage.error(msg);
      return Promise.reject("error");
    } else {
      return res.data.data;
    }
  },
  (error) => {
    console.log("err" + error);
    let { message } = error;
    if (message == "Network Error") {
      message = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      message = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      message = "系统接口" + message.substr(message.length - 3) + "异常";
    }
    AMessage.error(message);
    return Promise.reject(error);
  }
);

export default service;
