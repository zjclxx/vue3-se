<template>
  <div class="container">
    <div v-for="(_, lineIndex) in 7" :key="lineIndex" class="line">
      <div
        v-for="(_, IIndex) in 10"
        :key="IIndex"
        class="item"
        @mouseenter="handleMouseEnter(lineIndex, IIndex)"
        @mouseleave="handleMoveLeave(lineIndex, IIndex)"></div>
    </div>
    <Back></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  const handleMouseEnter = (line, index) => {
    const scaleVal = "scale(0.7)";
    honeycombScale(scaleVal, line, index);
  };
  const handleMoveLeave = (line, index) => {
    honeycombScale("", line, index);
  };

  const honeycombScale = (val, line, index) => {
    const lines = document.querySelectorAll(".line");
    if (lines.length) {
      if (line === 0) {
        const currentLineItems = lines[line].querySelectorAll(".item");
        const nextLineItems = lines[line + 1].querySelectorAll(".item");
        nextLineItems[index].style.transform = val;
        if (index !== nextLineItems.length - 1) {
          nextLineItems[index + 1].style.transform = val;
        }
        if (index !== 0) {
          currentLineItems[index - 1].style.transform = val;
        }
        if (index !== currentLineItems.length - 1) {
          currentLineItems[index + 1].style.transform = val;
        }
      } else if (line === lines.length - 1) {
        const lastLineItems = lines[line - 1].querySelectorAll(".item");
        const currentLineItems = lines[line].querySelectorAll(".item");
        lastLineItems[index].style.transform = val;
        if (index !== lastLineItems.length - 1) {
          lastLineItems[index + 1].style.transform = val;
        }
        if (index !== 0) {
          currentLineItems[index - 1].style.transform = val;
        }
        if (index !== currentLineItems.length - 1) {
          currentLineItems[index + 1].style.transform = val;
        }
      } else {
        const lastLineItems = lines[line - 1].querySelectorAll(".item");
        const currentLineItems = lines[line].querySelectorAll(".item");
        const nextLineItems = lines[line + 1].querySelectorAll(".item");
        if (index !== 0) {
          currentLineItems[index - 1].style.transform = val;
        }
        if (index !== currentLineItems.length - 1) {
          currentLineItems[index + 1].style.transform = val;
        }
        if (line % 2 === 0) {
          lastLineItems[index].style.transform = val;
          if (index !== lastLineItems.length - 1) {
            lastLineItems[index + 1].style.transform = val;
          }
          nextLineItems[index].style.transform = val;
          if (index !== nextLineItems.length - 1) {
            nextLineItems[index + 1].style.transform = val;
          }
        } else {
          lastLineItems[index].style.transform = val;
          if (index !== 0) {
            lastLineItems[index - 1].style.transform = val;
          }
          nextLineItems[index].style.transform = val;
          if (index !== 0) {
            nextLineItems[index - 1].style.transform = val;
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  $n: 9;
  // $size: 100vw / $n;
  $size: calc(100vw / $n);

  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow: hidden auto;
  }

  .line {
    display: flex;
    &:nth-child(even) {
      // transform: translateX(-$size / 2);
      transform: translateX(calc(-1 * $size / 2));
    }

    &:nth-child(n + 2) {
      margin-top: calc(-1 * $size / 6);
      // margin-top: -$size / 6;
    }
  }

  .item {
    width: $size;
    height: $size;
    flex-shrink: 0;
    background: #e4ac01;
    outline: 2px solid #fff;
    clip-path: polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%);
    transition: all 0.5s ease;
    &:hover {
      transform: scale(1.3);
    }
  }
</style>
