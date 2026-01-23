<template>
  <div class="whole-container">
    <div class="content" ref="parentRef">
      <div class="circle" ref="circleRef">
        <div
          v-for="(_, index) in divNum"
          :key="index"
          class="ring-item"
          ref="ringRef"
          :style="{
            transition: 'transform ' + ringBallTransitionTime + 's ease-in-out',
          }">
          <span v-text="formatNumberToChinese(index)"></span>
        </div>
        <div class="tip-container" role="region" aria-label="操作提示">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <path
                d="M 50 50 m -30 0 a 20 20 0 1 0 60 0"
                id="circle-path"
                fill="transparent" />
            </defs>

            <text fill="#0eb83a" font-size="4">
              <textPath
                href="#circle-path"
                startOffset="50%"
                text-anchor="middle">
                请尝试点击或长按两边的按钮
              </textPath>
            </text>
          </svg>
        </div>
        <div
          class="left-rotate"
          title="左旋"
          :style="{
            transform:
              'translate(' +
              computedCircleRadius * 0.4 +
              'px, calc(' +
              computedCircleRadius * 0.8 +
              'px - 50%)) rotate(-60deg)',
          }"
          @click="handleRotateClick('left')"
          ref="leftRotateRef">
          <RotateLeftOutlined :style="{ fontSize: '2vw' }" />
        </div>
        <div
          class="right-rotate"
          title="右旋"
          :style="{
            transform:
              'translate(' +
              computedCircleRadius * 1.4 +
              'px, calc(' +
              computedCircleRadius * 0.8 +
              'px - 50%)) rotate(60deg)',
          }"
          @click="handleRotateClick('right')"
          ref="rightRotateRef">
          <RotateRightOutlined :style="{ fontSize: '2vw' }" />
        </div>
      </div>
    </div>
    <Back></Back>
  </div>
</template>

<script setup>
  import {
    RotateLeftOutlined,
    RotateRightOutlined,
  } from "@ant-design/icons-vue";
  import Back from "@/components/back/index.vue";
  import { useDebounceFn } from "@vueuse/core";
  import { onMounted, ref, onUnmounted, nextTick } from "vue";
  import { formatNumberToChinese } from "@/utils";
  import useLongPress from "@/plugins/continuePress";

  const divNum = ref(10); //外围影响的个数  可直接更改
  const computedCircleRadius = ref(0); //会根据屏幕动态计算 取父元素的最短边

  const divSize = ref(150); //是周围的boxSize

  const parentRef = ref();
  const circleRef = ref();
  const ringRef = ref();
  const dynamicAngle = ref(0);
  const ringBallTransitionTime = ref(1);

  onMounted(() => {
    initCircle();
    initRing();
    window.addEventListener("resize", handleResize);
    addLinsteners();
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    removeLinsteners();
  });

  const initCircle = () => {
    const parentDom = parentRef.value.getBoundingClientRect();
    const parentWidth = parentDom.width;
    const parentHeight = parentDom.height;
    // console.log("parentDom", parentDom);
    if (parentWidth < parentHeight) {
      computedCircleRadius.value = parentWidth / 2;
    } else {
      computedCircleRadius.value = parentHeight / 2;
    }
    circleRef.value.style.width = computedCircleRadius.value * 2 + "px";
    circleRef.value.style.height = computedCircleRadius.value * 2 + "px";
  };

  const initRing = () => {
    const offsetAhd = (dynamicAngle.value * Math.PI) / 180;
    const avd = 360 / divNum.value; //每一个div对应的角度
    const ahd = (avd * Math.PI) / 180; //每一个div对应的弧度
    // console.log("initRing", ringRef.value);
    if (ringRef.value && ringRef.value.length) {
      ringRef.value.forEach((item, index) => {
        const x =
          computedCircleRadius.value +
          Math.sin(ahd * index + offsetAhd) * computedCircleRadius.value -
          divSize.value / 2 +
          "px";
        const y =
          computedCircleRadius.value +
          Math.cos(ahd * index + offsetAhd) * computedCircleRadius.value -
          divSize.value / 2 +
          "px";
        item.style.transform = `translate(${x},${y})`;
      });
    }
  };

  const handleResize = useDebounceFn(() => {
    initCircle();
    initRing();
  }, 300);

  const handleRotateClick = (type) => {
    if (ringBallTransitionTime.value >= 1) {
      ringBallTransitionTime.value = 0.1;
    }
    if (type === "left") {
      dynamicAngle.value += 10;
    } else {
      dynamicAngle.value -= 10;
    }
    initRing();
  };
  const leftRotateRef = ref();
  const { start: startLeft, stop: stopLeft } = useLongPress(
    () => handleRotateClick("left"),
    {},
  );
  const rightRotateRef = ref();
  const { start: startRight, stop: stopRight } = useLongPress(
    () => handleRotateClick("right"),
    {},
  );

  const addLinsteners = () => {
    if (leftRotateRef.value) {
      leftRotateRef.value.addEventListener("mousedown", startLeft);
      leftRotateRef.value.addEventListener("touchstart", startLeft);
      leftRotateRef.value.addEventListener("mouseup", stopLeft);
      leftRotateRef.value.addEventListener("mouseleave", stopLeft);
      leftRotateRef.value.addEventListener("touchend", stopLeft);
    }
    if (rightRotateRef.value) {
      rightRotateRef.value.addEventListener("mousedown", startRight);
      rightRotateRef.value.addEventListener("touchstart", startRight);
      rightRotateRef.value.addEventListener("mouseup", stopRight);
      rightRotateRef.value.addEventListener("mouseleave", stopRight);
      rightRotateRef.value.addEventListener("touchend", stopRight);
    }
  };

  const removeLinsteners = () => {
    if (leftRotateRef.value) {
      leftRotateRef.value.removeEventListener("mousedown", startLeft);
      leftRotateRef.value.removeEventListener("touchstart", startLeft);
      leftRotateRef.value.removeEventListener("mouseup", stopLeft);
      leftRotateRef.value.removeEventListener("mouseleave", stopLeft);
      leftRotateRef.value.removeEventListener("touchend", stopLeft);
    }
    if (rightRotateRef.value) {
      rightRotateRef.value.removeEventListener("mousedown", startRight);
      rightRotateRef.value.removeEventListener("touchstart", startRight);
      rightRotateRef.value.removeEventListener("mouseup", stopRight);
      rightRotateRef.value.removeEventListener("mouseleave", stopRight);
      rightRotateRef.value.removeEventListener("touchend", stopRight);
    }
  };
</script>

<style lang="scss" scoped>
  $box-size: v-bind("divSize + 'px'");
  .whole-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .content {
      width: calc(95% - $box-size);
      height: calc(95% - $box-size);
      display: flex;
      justify-content: center;
      align-items: center;
      .circle {
        border-radius: 50%;
        background: #fd7777;
        position: relative;
        .ring-item {
          width: $box-size;
          height: $box-size;
          transform: translate(0, 0);
          border-radius: 50%;
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 24px;
          font-weight: 500;
          background-color: #dccafe80;
          user-select: none;
        }

        .left-rotate,
        .right-rotate {
          position: absolute;
          // transform: translate(0, 0);
          transform-origin: center center;
          // transition: transform 1s ease-in-out;
          border-radius: 50%;
          background-color: #ffffff80;
          cursor: pointer;
          padding: 2%;
          &:hover {
            background-color: #ebeaea;
            box-shadow: 0 0 10px #ffffffaa;
          }
          &:active {
            background-color: #fff4f4;
          }
        }

        .tip-container {
          position: absolute;
          width: 100%;
          height: 100%;
          user-select: none;
        }
      }
    }
  }
</style>
