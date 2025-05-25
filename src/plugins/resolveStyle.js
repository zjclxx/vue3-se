//自动引入ant样式文件处理
export function resolveStyle(name) {
  // console.log("name", name);
  if (name === "form-item" || name === "textarea") {
    return null;
  }
  return `ant-design-vue/es/${name}/style/css.js`;
}
