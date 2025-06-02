<template>
  <div class="container">
    <div v-for="item in 5" :key="item" class="line">
      <div v-for="h in 10" :key="h" class="item"></div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  $n: 9;
  $size: 100vw / $n;

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden auto;
  }

  .line {
    display: flex;
    &:nth-child(even) {
      transform: translateX(-$size / 2);
    }

    &:nth-child(n + 2) {
      margin-top: -$size / 6;
    }
  }

  .item {
    width: $size;
    height: $size;
    flex-shrink: 0;
    background: #e4ac01;
    outline: 2px solid #fff;
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
  }
</style>
