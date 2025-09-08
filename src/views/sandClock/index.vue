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
      lazyLoadModule.value = module;
      lazyLoadModule.value.init();
    });
  };
</script>

<style lang="scss" scoped>
  canvas {
    background: radial-gradient(#fff, #8c738c);
    display: block;
  }
</style>
