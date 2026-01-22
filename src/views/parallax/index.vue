<template>
  <div class="parallax-container">
    <div id="smooth-content">
      <section>
        <span>你来了，欢迎</span>
      </section>
      <section>
        <span>客官请随便看看</span>
      </section>
      <section>
        <span>这个可是非卖品</span>
      </section>
      <section>
        <span>不买也没关系，那么</span>
      </section>
    </div>
    <Back></Back>
  </div>
</template>

<script setup>
  import { onMounted, nextTick, onBeforeUnmount, ref } from "vue";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { ScrollSmoother } from "gsap/ScrollSmoother";
  import Back from "@/components/back/index.vue";

  onMounted(() => {
    nextTick(() => {
      animationAction();
    });
  });

  const smoother = ref();
  const animationAction = () => {
    const sections = document.querySelectorAll("section");
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    sections.forEach((item) => {
      gsap.fromTo(
        item,
        {
          backgroundPositionY: `-${window.innerHeight / 2}px`,
        },
        {
          backgroundPositionY: `${window.innerHeight / 2}px`,
          // duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            //   // start: "top top",
            //   // end: "bottom bottom",
            scrub: 0.5,
          },
        },
      );
    });
    smoother.value = ScrollSmoother.create({
      content: "#smooth-content",
      smooth: 1,
      effects: "back.out",
    });
    ScrollTrigger.create({
      trigger: "#smooth-content",
      start: "top top",
      end: "bottom bottom",
      snap: {
        snapTo: [0, 0.33334, 0.66667, 1],
        duration: 1.5,
        delay: 0.3,
        ease: "back.out",
      },
      scrub: 0.5,
    });
  };

  onBeforeUnmount(() => {
    if (smoother.value) smoother.value.kill();
  });
</script>

<style lang="scss" scoped>
  .parallax-container {
    width: 100%;
    // height: 100%;
    // overflow: hidden auto;
    #smooth-content {
      section {
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        &:nth-child(1) {
          background-image: url("../../assets/images/waterfall/waterfall1.jpg");
        }
        &:nth-child(2) {
          background-image: url("../../assets/images/waterfall/waterfall8.jpg");
        }
        &:nth-child(3) {
          background-image: url("../../assets/images/waterfall/waterfall12.jpg");
        }
        &:nth-child(4) {
          background-image: url("../../assets/images/waterfall/waterfall23.jpg");
        }
        span {
          font-size: 4vw;
          font-weight: 600;
          color: #1200ff;
        }
      }
    }
  }
</style>
