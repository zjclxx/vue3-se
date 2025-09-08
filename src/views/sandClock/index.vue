<template>
  <div>
    <canvas></canvas>
  </div>
</template>

<script setup>
  import { onMounted, onBeforeUnmount, ref } from "vue";
  onMounted(() => {
    init();
  });

  onBeforeUnmount(() => {
    lazyLoadModule.value.stopRAF();
  });

  const lazyLoadModule = ref(null);

  const init = () => {
    import("./clock.js").then((module) => {
      // console.log("module", module);
      lazyLoadModule.value = module;
    });
  };
</script>

<style lang="scss" scoped>
  canvas {
    // width: 100%;
    // height: 100%;
    background: radial-gradient(#fff, #8c738c);
    display: block;
  }
</style>
