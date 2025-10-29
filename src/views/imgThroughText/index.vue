<template>
  <div class="container" @mousewheel="handleMousewheel">
    <h1
      class="throughText"
      :style="{
        fontSize: normalSize + 'dvw',
      }">
      PLANTS VS ZOMBIES
    </h1>
    <Back></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import { onMounted, ref } from "vue";

  onMounted(() => {
    setTimeout(() => {
      alert("请使用鼠标滚轮调节文字大小");
    }, 350);
  });
  const miniSize = 10;
  const maxiSize = 350;
  const normalSize = ref(200);
  const handleMousewheel = (e) => {
    console.log(e);
    if (e.deltaY > 0) {
      normalSize.value = Math.max(normalSize.value - 10, miniSize);
    } else {
      normalSize.value = Math.min(normalSize.value + 10, maxiSize);
    }
  };
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow: hidden auto;
    .throughText {
      height: 100%;
      margin-bottom: 0;
      line-height: 0.7;
      display: flex;
      justify-content: center;
      align-items: center;
      // font-size: 12dvw;
      text-align: center;
      font-weight: 700;
      color: transparent;
      white-space: nowrap;
      background: url("../../assets//images//throughText/pvz.jpg") no-repeat
        center/cover;
      background-clip: text;
      font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    }
  }
</style>
