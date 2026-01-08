<template>
  <div class="whole-container">
    <div class="content" ref="parentRef">
      <div class="circle" ref="circleRef">
        <div
          v-for="(_, index) in divNum"
          :key="index"
          class="ring-item"
          ref="ringRef">
          <span v-text="formatNumberToChinese(index)"></span>
        </div>
      </div>
    </div>
    <Back></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import { useDebounceFn } from "@vueuse/core";
  import { onMounted, ref, onUnmounted } from "vue";
  import { formatNumberToChinese } from "@/utils";

  const divNum = ref(10); //外围影响的个数  可直接更改
  const computedCircleRadius = ref(0); //会根据屏幕动态计算 取父元素的最短边

  const divSize = ref(150); //是周围的boxSize

  const parentRef = ref();
  const circleRef = ref();
  const ringRef = ref();

  onMounted(() => {
    initCircle();
    initRing();
    window.addEventListener("resize", handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
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
    const avd = 360 / divNum.value; //每一个div对应的角度
    const ahd = (avd * Math.PI) / 180; //每一个div对应的弧度
    // console.log("initRing", ringRef.value);
    if (ringRef.value && ringRef.value.length) {
      ringRef.value.forEach((item, index) => {
        item.style.left =
          computedCircleRadius.value +
          Math.sin(ahd * index) * computedCircleRadius.value -
          divSize.value / 2 +
          "px";
        item.style.top =
          computedCircleRadius.value +
          Math.cos(ahd * index) * computedCircleRadius.value -
          divSize.value / 2 +
          "px";
      });
    }
  };

  const handleResize = useDebounceFn(() => {
    initCircle();
    initRing();
  }, 300);
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
      }
    }
  }
</style>
