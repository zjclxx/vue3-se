# waterfall + Vue 3 + vite

使用 vite 独有 import.meta.glob 来动态引入该目录下所有指定的类型文件，
本项目是 assets/images/waterfall 中所有的 jpg 文件，并使用瀑布流展示，
具有响应式，模拟分页加载，下拉到出现[加载中...]元素的情况下，
用 IntersectionObserver 与视口交叉监听触发

## Install jsMind

```bash
npm install jsmind
```

## Create component

Create a new component and add to `App`

```vue
<script>
  import jsMind from "jsmind";
  import "jsmind/draggable-node";
  import "jsmind/style/jsmind.css";

  export default {
    data() {
      return {
        jsmind_options: {
          editable: true,
          theme: "primary",
        },
        jsmind_data: {
          // ...
        },
      };
    },
    mounted() {
      let options = Object.assign(this.jsmind_options, {
        container: this.$refs.jsmind_container,
      });
      let jm = new jsMind(options);
      jm.show(this.jsmind_data);
    },
  };
</script>

<style scoped>
  .jsmind-container {
    width: 1024px;
    height: 700px;
    border: solid 1px #ccc;
  }
</style>

<template>
  <div ref="jsmind_container" class="jsmind-container"></div>
</template>
```

## Build your project

```bash
npm run build
```

## More

jsMind project home: <a href="https://github.com/hizzgdev/jsmind">https://github.com/hizzgdev/jsmind</a>
