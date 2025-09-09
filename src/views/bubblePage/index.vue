<template>
  <div class="whole-container">
    <div class="tip">
      <span>你获得了一颗星星!</span>
    </div>
    <div class="star"></div>
    <div class="canvas-container">
      <canvas ref="bubbleCanvas" />
    </div>
    <Back></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import { onMounted, ref, onBeforeUnmount } from "vue";
  import pageBubble from ".";

  const bubbleCanvas = ref();

  onMounted(() => {
    setTimeout(() => {
      pageBubble.init(bubbleCanvas.value);
    }, 700);

    onBeforeUnmount(() => {
      pageBubble.removeListeners();
    });
  });
</script>

<style lang="scss" scoped>
  $star-size: 300px;
  .whole-container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .canvas-container {
      width: 100%;
      height: 100%;
    }
    .tip {
      position: absolute;
      left: 50%;
      top: 10%;
      width: fit-content;
      color: #111010;
      opacity: 0;
      font-size: 32px;
      animation-name: tipShow;
      animation-duration: 3s;
      animation-timing-function: ease;
      animation-iteration-count: 1;
      animation-fill-mode: forwards;
      animation-delay: 2s;
    }
  }
  .star {
    width: $star-size;
    height: $star-size;
    position: absolute;
    // left: 50%;
    // transform: translateX(-50%);
    left: calc(50% - $star-size / 2);
    bottom: -$star-size;
    clip-path: polygon(
      50% 0%,
      61% 35%,
      98% 35%,
      68% 57%,
      85% 100%,
      50% 78%,
      15% 100%,
      32% 57%,
      2% 35%,
      39% 35%
    );
    // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: repeating-linear-gradient(
      -45deg,
      #fbff00,
      #6a844d 30px,
      #eeff00 24px,
      #ff0000 37px
    );
    animation-name: starRise;
    animation-duration: 7s;
    animation-timing-function: ease;
    animation-iteration-count: 1;
    animation-fill-mode: forwards;
  }
  @keyframes starRise {
    from {
      transform: scale(0.1);
      opacity: 0;
    }

    to {
      transform: scale(1);
      opacity: 1;
      bottom: 50%;
    }
  }

  @keyframes tipShow {
    from {
      transform: translateX(-50%) scale(0);
      opacity: 0;
    }

    to {
      transform: translateX(-50%) scale(1);
      opacity: 1;
    }
  }
</style>
