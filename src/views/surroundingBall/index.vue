<template>
  <div
    ref="container"
    class="container"
    @mousedown="startDrag"
    @mouseup="stopDrag">
    <div class="svg-container">
      <svg width="1400" height="800">
        <linearGradient
          id="Gradient1"
          x1="0"
          y1="0"
          x2="1 + Math.sqrt(2)"
          y2="1">
          <stop offset="0%" stop-color="rgba(160, 166, 255, 1)" />
          <stop offset="100%" stop-color="rgba(71, 17, 255, 1)" />
        </linearGradient>
        <ellipse
          ref="ellipse"
          :cx="cx"
          :cy="cy"
          :rx="rx"
          :ry="ry"
          stroke="gray"
          fill="none" />
        <circle
          v-for="(dot, index) in dots"
          :key="index"
          :ref="(el) => (dotRefs[index] = el)"
          :r="dot.r"
          fill="url(#Gradient1)"></circle>
        <text
          v-for="(_, index) in dots"
          :key="index"
          :ref="(el) => (centerVal[index] = el)"
          text-anchor="middle"
          fill="white">
          <tspan font-size="18">320</tspan>
          <tspan font-size="12">分</tspan>
        </text>
        <text
          v-for="(_, index) in dots"
          :key="index"
          :ref="(el) => (bottomCity[index] = el)"
          text-anchor="middle"
          font-size="16"
          fill="black">
          上海市
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, ref } from "vue";
  import { gsap } from "gsap";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";

  gsap.registerPlugin(MotionPathPlugin);

  const cx = 700;
  const cy = 400;
  const rx = 600;
  const ry = 200;

  const dotRefs = [];
  const centerVal = [];
  const bottomCity = [];
  const ellipse = ref(null);
  const container = ref(null);

  const DOT_COUNT = 11;
  const dots = ref(
    Array.from({ length: DOT_COUNT }, () => ({
      r: Math.random() * 20 + 40, // 半径在 40 ~ 60 之间
    }))
  );

  // const paths = [];
  const angleOffset = (2 * Math.PI) / DOT_COUNT;

  let anglePositions = [];
  let isDragging = false;
  let animationFrame = null;

  const getEllipsePoint = (angle) => {
    return {
      x: cx + rx * Math.cos(angle),
      y: cy + ry * Math.sin(angle),
    };
  };

  // const getCircleradius = (x, y) => {};
  const updateDotPositions = () => {
    dots.value.forEach((_, index) => {
      const angle = anglePositions[index];
      const { x, y } = getEllipsePoint(angle);
      gsap.set(dotRefs[index], {
        cx: x,
        cy: y,
      });
      gsap.set(centerVal[index], {
        x: x,
        y: y + 5,
        // dy: 10,
      });
      gsap.set(bottomCity[index], {
        x: x,
        y: y + 70,
      });
    });
  };

  const moveDots = () => {
    if (!isDragging) return;
    // 每帧更新每个点的角度
    anglePositions = anglePositions.map((angle) => angle + 0.01);
    updateDotPositions();
    animationFrame = requestAnimationFrame(moveDots);
  };

  const startDrag = () => {
    if (isDragging) return;
    isDragging = true;
    animationFrame = requestAnimationFrame(moveDots);
  };

  const stopDrag = () => {
    isDragging = false;
    if (animationFrame) cancelAnimationFrame(animationFrame);
  };

  onMounted(() => {
    // 初始化每个点的角度
    anglePositions = dots.value.map((_, i) => i * angleOffset);
    updateDotPositions();
  });
</script>

<style lang="scss" scoped>
  .container {
    // display: flex;
    margin: auto;
    .svg-container {
      width: 1400px;
      height: 800px;
      user-select: none;
      cursor: grab;
    }
  }
</style>
