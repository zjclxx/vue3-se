<template>
  <div class="wholeContaienr">
    <WaterFall></WaterFall>
    <Back></Back>
  </div>
</template>

<script setup>
  import WaterFall from "./WaterFall.vue";
  import Back from "@/components/back/index.vue";
</script>

<style lang="scss" scoped>
  .wholeContaienr {
    width: 100%;
    height: 100%;
  }
</style>
