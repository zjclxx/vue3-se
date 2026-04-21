<template>
  <div class="luck-wheel-wrapper">
    <div class="marker"></div>
    <section class="wheel"></section>
    <button class="draw-btn" @click="">抽奖</button>
    <Back theme="light" />
  </div>
</template>

<script setup>
  import Back from "@/components/back/index.vue";
  import { gsap } from "gsap";
  import { InertiaPlugin } from "gsap/InertiaPlugin";
  import { onMounted, getCurrentInstance } from "vue";

  gsap.registerPlugin(InertiaPlugin);
  const init = () => {
    const wheel = document.querySelector(".wheel");
    const btn = document.querySelector(".draw-btn");
    const elements = 10;
    const step = 360 / elements;
    const minRotation = 2160;
    const gradients = [
      "green",
      "blue",
      "orange",
      "purple",
      "red",
      "green-2",
      "orange",
      "pink",
      "gray",
      "blue-2",
    ];
    let landingRotation = -step / 2;
    let currentIndex = 0;
    let isTweening = false;

    const scopeId = getCurrentInstance()?.type.__scopeId;

    for (let i = 0; i < elements; i++) {
      const line = document.createElement("div");
      line.classList.add("line");
      line.setAttribute(scopeId, "");
      wheel.appendChild(line);
      gsap.set(line, { rotation: step * i });
      const number = document.createElement("div");
      number.classList.add("number");
      number.classList.add("gradient-" + gradients[i]);
      number.innerText = i + 1;
      number.setAttribute(scopeId, "");
      wheel.appendChild(number);
      gsap.set(number, {
        x: "450%",
        y: "90%",
        xPercent: 0,
        yPercent: 0,
        rotation: step / 2,
      });
      gsap.set(number, {
        rotation: step * i + step / 2,
        transformOrigin: "center 20vmin",
      });
    }

    gsap.set(wheel, { rotation: -step / 2 });

    btn.addEventListener("click", () => {
      if (!isTweening) {
        isTweening = true;
        const landingElement = Math.round(Math.random() * (elements - 1));
        const indexDelta = landingElement - currentIndex;
        gsap.to(wheel, {
          rotation: "-=" + step,
          duration: 0.1,
          ease: "power1.inOut",
        });
        landingRotation =
          gsap.getProperty(wheel, "rotation") +
          (minRotation - indexDelta * step);
        currentIndex = landingElement;
        gsap.to(".wheel", {
          inertia: {
            rotation: {
              velocity: 900,
              end: landingRotation,
            },
            duration: 3.5,
          },
          delay: 0.175,
          onComplete: () => (isTweening = false),
        });
      }
    });
  };

  onMounted(() => {
    init();
  });
</script>

<style lang="scss" scoped>
  .luck-wheel-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
    .wheel {
      width: 50vmin;
      height: 50vmin;
      border-radius: 999px;
      border: 1px solid #fff;
      cursor: pointer;
      user-select: none;
      position: relative;
    }
    .marker {
      height: clamp(20px, 5vw, 30px);
      width: clamp(20px, 5vw, 30px);
      background-color: #fff;
      clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
    }
    .line {
      width: 1px;
      height: 100%;
      border-left: 1px dashed #fff;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
    }
    .number {
      position: absolute;
      top: 0;
      left: 0;
      font-size: 1.3vw;
      color: #000;
      width: 5vmin;
      height: 5vmin;
      padding: 5px;
      border-radius: 999px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.gradient-green {
        background:
          linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-blue {
        background:
          radial-gradient(
            78.77% 78.77% at 71.71% 30.77%,
            #f0fcff 0%,
            #9bedff 67.21%,
            #98ecff 76.04%,
            #5be1ff 84.9%,
            #00bae2 94.79%
          ),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-orange {
        background:
          linear-gradient(111.45deg, #ff8709 19.42%, #f7bdf8 73.08%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-purple {
        background:
          linear-gradient(153.58deg, #f7bdf8 32.25%, #2f3cc0 92.68%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-blue-2 {
        background:
          linear-gradient(144.02deg, #00bae2 4.56%, #5178f7 72.98%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-green-2 {
        background:
          linear-gradient(166.9deg, #0ae448 53.19%, #0085d0 107.69%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-pink {
        background:
          linear-gradient(317.42deg, #ffe9fe 10.4%, #ff96f9 83.03%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-red {
        background:
          linear-gradient(165.72deg, #f7bdf8 21.15%, #cd237f 81.93%),
          url("../../assets/images/ball/noise.png");
      }
      &.gradient-gray {
        background:
          linear-gradient(165.72deg, #ffffff 21.15%, #cac2c2 81.93%),
          url("../../assets/images/ball/noise.png");
      }
    }

    .draw-btn {
      margin-top: 20px;
      padding: 20px 70px;
      font-size: 1.5vw;
      cursor: pointer;
      border-radius: 6px;
      background-color: #e5e5e6;
    }
  }
</style>
