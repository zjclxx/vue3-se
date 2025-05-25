<template>
  <div class="svg-icon-wrapper">
    <svg aria-hidden="true" class="svg-icon">
      <use :xlink:href="symbolId" :fill="color" />
    </svg>
  </div>
</template>

<script setup>
  import { computed } from "vue";
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#333",
    },
  });

  const symbolId = computed(() => {
    return `#icon-${props.name}`;
  });
</script>

<style lang="scss" scoped>
  .svg-icon-wrapper {
    width: 24px;
    height: 24px;
    .svg-icon {
      width: 100%;
      height: 100%;
    }
  }
</style>
