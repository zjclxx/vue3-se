<template>
  <div
    class="routeBack"
    :class="props.theme === 'dark' ? 'routeBack-dark' : 'routeBack-light'"
    @click="goBack()"
    title="返回">
    <rollback-outlined />
  </div>
</template>

<script setup>
  import { RollbackOutlined } from "@ant-design/icons-vue";
  import { useRouter } from "vue-router";

  const props = defineProps({
    theme: {
      type: String,
      default: "dark",
    },
  });

  const router = useRouter();

  const goBack = () => {
    router.back();
  };
</script>

<style lang="scss" scoped>
  .routeBack {
    cursor: pointer;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    backdrop-filter: blur(10px);
    position: fixed;
    top: 20px;
    left: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 500;
    &.routeBack-dark {
      background-color: rgba(0, 0, 0, 0.3);
      color: rgba(255, 255, 255, 1);
      &:hover {
        background-color: rgba(0, 0, 0, 0.5);
        color: rgba(255, 255, 255, 0.7);
      }
    }

    &.routeBack-light {
      background-color: rgba(255, 255, 255, 0.7);
      color: rgb(0, 0, 0);
      &:hover {
        background-color: rgba(255, 255, 255, 0.3);
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }
</style>
