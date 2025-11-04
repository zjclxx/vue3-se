<template>
  <div class="container">
    <div class="border-container">
      <div class="repeat-border">
        <div class="inner-border-container">
          <span>重复渐变边框效果</span>
        </div>
      </div>
      <div class="rotate-border">
        <span>旋转边框效果</span>
      </div>
      <div class="cone-border">
        <div class="self-box">
          <span>发光渐变边框</span>
        </div>
      </div>
    </div>
    <Back theme="light"></Back>
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
</script>

<style lang="scss" scoped>
  $zIndex: 10;
  // $sizeHeight: 300px;
  $aspectRatio: 1.5;
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    // overflow: hidden auto;
    background: #000;
    padding: 16px 0;
    z-index: -1;

    .border-container {
      margin: auto;
      width: 60%;
      min-width: 1000px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 100px;
      row-gap: 50px;
      justify-content: space-between;
      align-content: start;
      position: relative;

      .repeat-border {
        // width: 100%;
        position: relative;
        // height: $sizeHeight;
        aspect-ratio: $aspectRatio;
        background: repeating-linear-gradient(
            -45deg,
            #e8544d,
            #e8544d 10px,
            #fff 10px,
            #fff 20px,
            #75adf8 20px,
            #75adf8 30px,
            #fff 30px,
            #fff 40px
          ) -20px -20px/200% 200%;
        transition: 0.3s;
        .inner-border-container {
          padding: 0 50px;
          position: absolute;
          width: calc(100% - 14px);
          height: calc(100% - 20px);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background-color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          font-size: 2vw;
        }
        &:hover {
          box-shadow: 0 3px 10px 5px rgba(8, 255, 119, 0.8);
          background-position: 0 0;
        }
      }

      .rotate-border {
        display: flex;
        justify-content: center;
        align-items: center;
        // height: $sizeHeight;
        aspect-ratio: $aspectRatio;
        position: relative;
        // outline: 4px solid #fff;
        overflow: hidden;
        color: #ffc8ed;
        font-size: 2vw;
        border-radius: 6px;
        z-index: $zIndex;
        span {
          z-index: $zIndex;
        }
        &::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          width: 200%;
          height: 200%;
          // background-color: #006eff;
          // background: linear-gradient(-45deg, #2600ff, #b2fffb);
          background: linear-gradient(
            to right top,
            rgb(60, 255, 0),
            rgb(89, 0, 255)
          );
          // z-index: $zIndex - 2;
          z-index: -1;
          animation: rotateBorder 5s linear infinite;
          transform-origin: 0% 0%;
        }
        &::before {
          content: "";
          inset: 8px;
          position: absolute;
          background-color: #000;
          // background-color: #e8544d;
          border-radius: inherit;
          z-index: $zIndex - 1;
        }
        @keyframes rotateBorder {
          to {
            transform: rotate(360deg);
          }
        }
      }

      .cone-border {
        // height: $sizeHeight;
        aspect-ratio: $aspectRatio;
        // overflow: hidden;
        position: relative;
        padding: 4px;
        .self-box {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #302e2e;
          color: #fff;
          font-size: 2vw;
          border-radius: 10px;
        }

        &::after,
        &::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          // left: 0;
          // top: 0;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          background-image: conic-gradient(
            #ff4545,
            #00ff99,
            #006aff,
            #ff0095,
            #ff4545
          );
          z-index: -1;
          border-radius: 10px;
        }

        &::before {
          filter: blur(1.2rem);
        }
      }
    }
  }
</style>
