<template>
  <div>
    <div class="container">
      <div v-for="item in list" :key="item.id" class="item">
        <div class="ball">
          <div>
            <span class="value-text">{{ item.value }}</span>
            <span class="unit-text">分</span>
          </div>
        </div>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="ellipse-container">
      <div v-for="item in list" :key="item.id" class="item">
        <div class="ball">
          <div>
            <span class="value-text">{{ item.value }}</span>
            <span class="unit-text">分</span>
          </div>
        </div>
        <div class="name">
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  const list = [
    {
      id: 1,
      name: "上海市",
      value: 960,
    },
    {
      id: 2,
      name: "北京市",
      value: 932,
    },
    {
      id: 3,
      name: "深圳市",
      value: 910,
    },
    {
      id: 4,
      name: "重庆市",
      value: 848,
    },
    {
      id: 5,
      name: "广州市",
      value: 802,
    },
    {
      id: 6,
      name: "苏州市",
      value: 795,
    },
    {
      id: 7,
      name: "成都市",
      value: 761,
    },
    {
      id: 8,
      name: "杭州市",
      value: 592,
    },
    {
      id: 9,
      name: "武汉市",
      value: 540,
    },
    {
      id: 10,
      name: "南京市",
      value: 526,
    },
    {
      id: 11,
      name: "天津市",
      value: 406,
    },
  ];
</script>
<style lang="scss" scoped>
  $ellipse-width: 750px;
  $ellipse-height: 240px;
  $dot-size1: 75px;
  $dot-size2: 59px;
  $dot-size3: 50px;
  $dot-size4: 47px;
  $dot-size5: 37px;
  $duration: 8s;
  $dot-num: 11;
  .container {
    width: 1030px;
    height: 297px;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    background: #dae3ff;
    position: relative;
    .item {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      .ball {
        background: linear-gradient(180deg, #51a6f2 0%, #3c89fb 100%);
        box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        div {
          // height: fit-content;
          display: flex;
          align-items: baseline;
          .value-text {
            font-weight: 500;
          }
          .unit-text {
            font-size: 10px;
          }
        }
      }
      .name {
        margin-top: 3px;
        color: #1d2129;
      }
      //第一个
      &:nth-child(1) {
        left: 50%;
        bottom: 47px;
        transform: translateX(-50%);
        .ball {
          width: $dot-size1;
          height: $dot-size1;
          background: linear-gradient(149deg, #a0a6ff 0%, #4711ff 100%);
          .value-text {
            font-size: 26px;
          }
        }
        .name {
          font-size: 16px;
          line-height: 22px;
        }
      }
      //第二个
      &:nth-child(2) {
        left: 605px;
        bottom: 65px;
        // transform: translateX(-50%);
        .ball {
          width: $dot-size2;
          height: $dot-size2;
          background: linear-gradient(157deg, #51f2d6 0%, #3cb9fb 100%);
          .value-text {
            font-size: 22px;
          }
        }
        .name {
          font-size: 14px;
          line-height: 20px;
        }
      }
      //第三个
      &:nth-child(3) {
        left: 342px;
        bottom: 65px;
        .ball {
          width: $dot-size2;
          height: $dot-size2;
          background: linear-gradient(157deg, #ffd797 0%, #ffa825 100%);
          .value-text {
            font-size: 22px;
          }
        }
        .name {
          font-size: 14px;
          line-height: 20px;
        }
      }
      //第四个
      &:nth-child(4) {
        left: 227px;
        bottom: 95px;
        .ball {
          width: $dot-size3;
          height: $dot-size3;
          .value-text {
            font-size: 20px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第五个
      &:nth-child(5) {
        left: 730px;
        bottom: 95px;
        .ball {
          width: $dot-size3;
          height: $dot-size3;
          .value-text {
            font-size: 20px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第六个
      &:nth-child(6) {
        left: 814px;
        bottom: 138px;
        .ball {
          width: $dot-size4;
          height: $dot-size4;
          .value-text {
            font-size: 18px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第七个
      &:nth-child(7) {
        left: 148px;
        bottom: 138px;
        .ball {
          width: $dot-size4;
          height: $dot-size4;
          .value-text {
            font-size: 18px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第八个
      &:nth-child(8) {
        left: 236px;
        bottom: 188px;
        .ball {
          width: $dot-size5;
          height: $dot-size5;
          .value-text {
            font-size: 14px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第九个
      &:nth-child(9) {
        left: 734px;
        bottom: 188px;
        .ball {
          width: $dot-size5;
          height: $dot-size5;
          .value-text {
            font-size: 14px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第十个
      &:nth-child(10) {
        left: 322px;
        bottom: 200px;
        .ball {
          width: 29px;
          height: 29px;
          .value-text {
            font-size: 10px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第十一个
      &:nth-child(11) {
        left: 656px;
        bottom: 200px;
        .ball {
          width: 29px;
          height: 29px;
          .value-text {
            font-size: 10px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
    }
  }

  // :root {
  //   --ellipse-width: 331px; /* 椭圆的宽度 (2 * a) */
  //   --ellipse-height: 150px; /* 椭圆的高度 (2 * b) */
  //   --animation-duration: 8s; /* 动画周期 */
  //   --dot-size1: 75px; /* 圆点大小 */
  //   --dot-size2: 59px; /* 圆点大小 */
  //   --num-dots: 11; /* 圆点数量 */
  // }
  @keyframes ellipse-path1 {
    0% {
      /* 270度，对应椭圆底部 (x=0, y=b) */
      transform: translate(
        0px,
        calc($ellipse-height / 2) - calc($dot-size1 / 2)
      );
    }
    25% {
      /* 360度，回到0度位置 */
      transform: translate(
        calc($ellipse-width / 2) - calc($dot-size1 / 2),
        0px
      );
    }
    // 50% {
    //   /* 0度，对应椭圆最右侧 (x=a, y=0) */
    //   transform: translate(
    //     calc($ellipse-width / 2) - calc($dot-size1 / 2),
    //     0px
    //   );
    // }
    50% {
      /* 90度，对应椭圆顶部 (x=0, y=-b) */
      // transform: translate(0px, calc(-$ellipse-height / 2 + $dot-size1 / 2));
      transform: translate(
        0px,
        calc(-1 * $ellipse-height / 2) + calc($dot-size1 / 2)
      );
    }
    75% {
      /* 180度，对应椭圆最左侧 (x=-a, y=0) */
      transform: translate(
        calc(-1 * $ellipse-width / 2) + calc($dot-size1 / 2),
        0px
      );
    }
    100% {
      transform: translate(
        0px,
        calc($ellipse-height / 2) - calc($dot-size1 / 2)
      );
    }
  }
  @keyframes ellipse-path2 {
    0% {
      /* 0度，对应椭圆最右侧 (x=a, y=0) */
      transform: translate(
        calc($ellipse-width / 2) - calc($dot-size2 / 2),
        0px
      );
    }
    25% {
      /* 90度，对应椭圆顶部 (x=0, y=-b) */
      // transform: translate(0px, calc(-$ellipse-height / 2 + $dot-size1 / 2));
      transform: translate(
        0px,
        calc(-1 * $ellipse-height / 2) + calc($dot-size2 / 2)
      );
    }
    50% {
      /* 180度，对应椭圆最左侧 (x=-a, y=0) */
      transform: translate(
        calc(-1 * $ellipse-width / 2) + calc($dot-size2 / 2),
        0px
      );
    }
    75% {
      /* 270度，对应椭圆底部 (x=0, y=b) */
      transform: translate(
        0px,
        calc($ellipse-height / 2) - calc($dot-size2 / 2)
      );
    }
    100% {
      /* 360度，回到0度位置 */
      transform: translate(
        calc($ellipse-width / 2) - calc($dot-size2 / 2),
        0px
      );
    }
  }

  .ellipse-container {
    margin-top: 100px;
    width: 1030px;
    height: 297px;
    // background-position: center;
    // background-repeat: no-repeat;
    // background-size: 100% 100%;
    background: #dae3ff;
    position: relative;
    .item {
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      .ball {
        background: linear-gradient(180deg, #51a6f2 0%, #3c89fb 100%);
        box-shadow: inset 0px 1px 3px 0px rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        div {
          // height: fit-content;
          display: flex;
          align-items: baseline;
          .value-text {
            font-weight: 500;
          }
          .unit-text {
            font-size: 10px;
          }
        }
      }
      .name {
        margin-top: 3px;
        color: #1d2129;
      }
      //第一个
      &:nth-child(1) {
        left: calc(50% - $dot-size1 / 2);
        bottom: 47px;
        // bottom: 0;
        // transform: translateX(-50%);
        // animation: ellipse-path1 $duration linear infinite
        //   calc($duration / $dot-num * 0);
        // transform: translate(
        //   0px,
        //   calc($ellipse-height / 2) - calc($dot-size1 / 2)
        // );
        .ball {
          width: $dot-size1;
          height: $dot-size1;
          background: linear-gradient(149deg, #a0a6ff 0%, #4711ff 100%);
          .value-text {
            font-size: 26px;
          }
        }
        .name {
          font-size: 16px;
          line-height: 22px;
        }
      }
      //第二个
      &:nth-child(2) {
        left: 605px;
        bottom: 65px;
        // transform: translateX(-50%);
        .ball {
          width: $dot-size2;
          height: $dot-size2;
          background: linear-gradient(157deg, #51f2d6 0%, #3cb9fb 100%);
          .value-text {
            font-size: 22px;
          }
        }
        .name {
          font-size: 14px;
          line-height: 20px;
        }
      }
      //第三个
      &:nth-child(3) {
        left: 342px;
        bottom: 65px;
        .ball {
          width: $dot-size2;
          height: $dot-size2;
          background: linear-gradient(157deg, #ffd797 0%, #ffa825 100%);
          .value-text {
            font-size: 22px;
          }
        }
        .name {
          font-size: 14px;
          line-height: 20px;
        }
      }
      //第四个
      &:nth-child(4) {
        left: 227px;
        bottom: 95px;
        .ball {
          width: $dot-size3;
          height: $dot-size3;
          .value-text {
            font-size: 20px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第五个
      &:nth-child(5) {
        left: 730px;
        bottom: 95px;
        .ball {
          width: $dot-size3;
          height: $dot-size3;
          .value-text {
            font-size: 20px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第六个
      &:nth-child(6) {
        left: 814px;
        bottom: 138px;
        .ball {
          width: $dot-size4;
          height: $dot-size4;
          .value-text {
            font-size: 18px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第七个
      &:nth-child(7) {
        left: 148px;
        bottom: 138px;
        .ball {
          width: $dot-size4;
          height: $dot-size4;
          .value-text {
            font-size: 18px;
          }
        }
        .name {
          font-size: 12px;
          line-height: 17px;
        }
      }
      //第八个
      &:nth-child(8) {
        left: 236px;
        bottom: 188px;
        .ball {
          width: $dot-size5;
          height: $dot-size5;
          .value-text {
            font-size: 14px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第九个
      &:nth-child(9) {
        left: 734px;
        bottom: 188px;
        .ball {
          width: $dot-size5;
          height: $dot-size5;
          .value-text {
            font-size: 14px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第十个
      &:nth-child(10) {
        left: 322px;
        bottom: 200px;
        .ball {
          width: 29px;
          height: 29px;
          .value-text {
            font-size: 10px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
      //第十一个
      &:nth-child(11) {
        left: 656px;
        bottom: 200px;
        .ball {
          width: 29px;
          height: 29px;
          .value-text {
            font-size: 10px;
          }
        }
        .name {
          font-size: 10px;
          line-height: 14px;
        }
      }
    }
  }
</style>

<style scoped>
  /* Houdini API */
  /* @property --x {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }
  @property --y {
    syntax: "<length>";
    inherits: false;
    initial-value: 0px;
  }
  @keyframes moveX {
    to {
      --x: 1px;
    }
  }
  @keyframes moveY {
    to {
      --y: 1px;
    }
  } */
</style>
