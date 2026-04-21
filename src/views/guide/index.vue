<template>
  <div class="guide-container">
    <div class="title-container">
      <span>导航页</span>
    </div>
    <div class="nav-container">
      <div class="list-container">
        <div
          v-for="item in guides"
          :key="item.id"
          class="nav-item"
          @click="goPath(item.path)">
          <div>
            <span>{{ item.title }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import guides from "./guides";
  import { useRouter } from "vue-router";

  const router = useRouter();

  const goPath = (path) => {
    router.push(path);
  };
</script>

<style lang="scss" scoped>
  .guide-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .title-container {
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 48px;
      background-color: #e7aece;
      letter-spacing: 8px;
      color: #2b0f00;
      font-weight: 600;
      flex-shrink: 0;
      position: sticky;
      top: 0;
    }
    .nav-container {
      width: 100%;
      // margin-top: 24px;
      padding-top: 24px;
      padding-bottom: 24px;
      flex: 1;
      display: flex;
      justify-content: center;
      background: linear-gradient(to bottom, #83d2f2, #36817d);
      .list-container {
        width: 85%;
        // height: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, 300px);
        column-gap: 100px;
        row-gap: 36px;
        justify-content: space-between;
        align-content: start;

        .nav-item {
          height: 150px;
          background-color: #f5f5f5;
          border: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 36px;
          cursor: pointer;
          border-radius: 8px;
          box-shadow: 5px 5px 10px 2px rgba(208, 230, 233, 0.52);
          transition: all 0.3s ease;
          &:hover {
            box-shadow: 7px 7px 10px 5px rgba(172, 237, 234, 0.52);
            background-color: #e3d8ff;
            color: #3e1f8e;
            border-color: #8b6eff;
            font-size: 35px;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
</style>
