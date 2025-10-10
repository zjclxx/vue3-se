<template>
  <div class="container">
    <canvas id="pinkboard"></canvas>
    <Back theme="dark"></Back>
  </div>
</template>

<script setup>
  import { useWindowSize } from "@vueuse/core";
  import { onMounted, ref, onBeforeUnmount, watch } from "vue";
  import Back from "@/components/back/index.vue";
  onMounted(() => {
    init();
  });
  onBeforeUnmount(() => {
    lazyLoadModule.value && lazyLoadModule.value.stopRAF();
  });

  const lazyLoadModule = ref(null);
  const { width } = useWindowSize();

  watch(
    () => width.value,
    () => {
      console.log("width", width.value);
      lazyLoadModule.value && lazyLoadModule.value.resize();
    }
  );
  const init = () => {
    import("./canvas.js").then((module) => {
      if (module) {
        lazyLoadModule.value = module;
        lazyLoadModule.value.init();
      }
    });
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
</style>
