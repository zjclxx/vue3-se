<template>
  <div class="parallax-container">
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
    <Back></Back>
  </div>
</template>

<script setup>
  import { onMounted } from "vue";
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import Back from "@/components/back/index.vue";

  onMounted(() => {
    animationAction();
  });
  const animationAction = () => {
    const sections = document.querySelectorAll("section");
    gsap.registerPlugin(ScrollTrigger);

    sections.forEach((item) => {
      gsap.fromTo(
        item,
        {
          backgroundPositionY: `-${window.innerHeight / 2}px`,
        },
        {
          backgroundPositionY: `${window.innerHeight / 2}px`,
          duration: 3,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            // start: "top top",W
            // end: "bottom top",
            scrub: true,
          },
        }
      );
    });
  };
</script>

<style lang="scss" scoped>
  .parallax-container {
    width: 100%;
    // height: 100%;
    // overflow: hidden auto;
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
</style>
