<template>
  <div class="mind-map-container" id="svg-container">
    <Back></Back>
  </div>
</template>

<script setup lang="ts">
  import Back from "@/components/back/index.vue";
  import { init } from "./map.js";
  import { onMounted } from "vue";

  onMounted(() => {
    init();
  });
</script>

<style lang="scss" scoped>
  .mind-map-container {
    width: 100%;
    height: 100%;
    background-color: #f4f5fd;
    position: relative;
    padding: 50px 0;
  }
</style>
<style>
  .mind-map-svg {
    transform: translateX(-50%);
    position: absolute;
    left: 50%;
    user-select: none;
  }
</style>
