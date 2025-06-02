<template>
  <div class="notFound-container">
    <div>
      <span>404</span>
    </div>
    <RouterLink to="/">点我回首页</RouterLink>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
  .notFound-container {
    width: 100%;
    // height: 300px;
    text-align: center;
    border-radius: 77px 77px 77px 77px;
    border: 35px double #bd24bd;
    background-color: #bde635;

    font-size: 100px;
  }
</style>
