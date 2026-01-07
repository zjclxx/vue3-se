<template>
  <div class="mind-map-container" id="svg-container">
    <Back></Back>
    <div class="origin-btn" @click="returnOrigin">
      <AimOutlined title="回到原点" style="font-size: 24px" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Back from "@/components/back/index.vue";
  import { init, destroy, returnOrigin } from "./map.js";
  import { onMounted, onBeforeUnmount } from "vue";
  import { AimOutlined } from "@ant-design/icons-vue";

  onMounted(() => {
    init();
  });
  onBeforeUnmount(() => {
    destroy();
  });
</script>

<style lang="scss" scoped>
  .mind-map-container {
    width: 100%;
    height: 100%;
    background-color: #f4f5fd;
    position: relative;
    padding: 50px 0;
    overflow: hidden;
    .origin-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      padding: 10px;
      border-radius: 50%;
      background-color: #f2fff1;
      cursor: pointer;
      line-height: initial;
      &:hover {
        background-color: #f9fddb;
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
          0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
      }
    }
  }
</style>
<style>
  .mind-map-svg {
    transform: translate(-50%, 0);
    position: absolute;
    left: 50%;
    user-select: none;
  }
</style>
