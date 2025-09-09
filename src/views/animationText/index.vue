<template>
  <div class="animationText-container">
    <div class="chart-container" ref="chartRef"></div>
    <Back theme="light"></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import * as echarts from "echarts";
  import { ref, onMounted, onUnmounted, nextTick } from "vue";
  const chartRef = ref(null);
  const chart = ref();

  const initChart = () => {
    chart.value = echarts.init(chartRef.value);
    chart.value.setOption({
      graphic: {
        elements: [
          {
            type: "text",
            left: "center",
            top: "center",
            style: {
              text: "兰 小 小",
              fontSize: 200,
              fontWeight: "bold",
              fontFamily: "Arial",
              lineDash: [0, 200],
              lineDashOffset: 0,
              fill: "transparent",
              stroke: "#8b6eff",
              lineWidth: 4,
            },
            keyframeAnimation: {
              duration: 3000,
              loop: true,
              keyframes: [
                {
                  percent: 0.6,
                  style: {
                    fill: "transparent",
                    lineDashOffset: 200,
                    lineDash: [200, 0],
                  },
                },
                {
                  percent: 0.7,
                  style: {
                    fill: "transparent",
                  },
                },
                {
                  percent: 0.9,
                  style: {
                    fill: "#91df8d",
                  },
                },
                {
                  percent: 1,
                  style: {
                    fill: "#91df8d",
                    lineWidth: 4,
                  },
                },
              ],
            },
          },
        ],
      },
    });
  };
  const resizeChart = () => {
    if (chart.value) {
      chart.value.dispose();
      nextTick(() => {
        initChart();
      });
    }
  };

  onMounted(() => {
    initChart();
    window.addEventListener("resize", resizeChart);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", resizeChart);
  });
</script>

<style lang="scss" scoped>
  .animationText-container {
    width: 100%;
    height: 100%;
    background: #000000;
    .chart-container {
      width: 100%;
      height: 100%;
    }
  }
</style>
