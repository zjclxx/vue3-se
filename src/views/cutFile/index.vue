<template>
  <div class="container">
    <input type="file" @change="handleFileChange" />

    <Back theme="light"></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import { cutFile } from ".";

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.time("cutFile");
    const chunks = await cutFile(file);
    console.timeEnd("cutFile");
    console.log(chunks);
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
