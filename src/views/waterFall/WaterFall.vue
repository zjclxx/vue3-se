<template>
  <div class="container">
    <div
      class="waterfall-container"
      :class="listNum === 1 ? 'single-column' : 'multiple-column'"
      ref="wfCRef">
      <div v-for="item in columnInfoList" :key="item.index" class="column-list">
        <img
          v-for="img in item.images"
          :key="img.uuid"
          :src="img.url"
          alt=""
          :width="columnWidth" />
      </div>
    </div>
    <div v-if="isNoMore" class="no-more">
      <span>没有更多了</span>
    </div>
    <div v-else class="load-more" ref="loadMoreRef">
      <span class="more-text">加载中...</span>
    </div>
  </div>
</template>

<script setup>
  import { h, nextTick, onMounted, ref, watch } from "vue";
  import { useElementSize, useDebounceFn } from "@vueuse/core";
  import { message as AMessage, Modal as AModal } from "ant-design-vue";
  import waterfallImages from "@/utils/waterfallImg.js"; //可以进入该文件修改目录中的图片或者格式
  import {
    createInterObserver,
    removeInterObserver,
  } from "@/utils/IntersectionObserver.js";
  import { buildUUID, findMindex } from "@/utils/index.js";
  import cache from "@/plugins/cache.js";

  const wfCRef = ref(null);
  const { width: wfCRefWidth } = useElementSize(wfCRef); //动态监听容器宽度，保持响应式

  const minSpace = 8; //列最小空隙(可配置)
  const columnWidth = 300; //每列的宽度(可配置)

  const listNum = ref(0); //列数(动态计算得到)
  const columnInfoList = ref([]); //列信息集合包含最小高度、图片集合(动态计算得到)

  let staticImgArr = []; //第一次请求的图片集合，在列数变化后，重新从这里获取(动态计算得到)

  const isLoadFinishAllImg = ref(false); //是否加载完了所有图片

  const loadMoreRef = ref(null);
  const pageIndex = ref(1); //第一页开始获取
  const pageSize = 6; //一次性获取多少张(可配置)

  const isNoMore = ref(false); //是否还有更多的图片可以获取,并且移除该dom取消observer监听

  const FIRST_DESC = "first_desc";

  onMounted(() => {
    firstLoadDescription();
    nextTick(() => {
      if (loadMoreRef.value) {
        createInterObserver(loadMoreRef.value, loadMore);
      }
    });
  });

  const firstLoadDescription = () => {
    // const sessionDesc = cache.session.getJSON(FIRST_DESC);
    // if(!sessionDesc) {
    console.log("cache", cache);
    AModal.info({
      title: () => {
        return h(
          "p",
          {
            style: {
              fontSize: "2.5rem",
            },
          },
          "首次加载说明"
        );
      },
      content: () => {
        return h(
          "p",
          {
            style: {
              fontSize: "2rem",
            },
          },
          "瀑布流展示，具有响应式布局，动态计算列数。第一次加载如果还能展示则会继续加载图片，直到加载更多被挤在视口下面才停止加载。"
        );
      },
      okText: "知道了",
      keyboard: false,
      width: "30%",
      icon: null,
      onOk: () => {
        // cache.session.setJSON(FIRST_DESC, 'first-loaded');
      },
      okButtonProps: {
        style: {
          fontSize: "1.5rem",
          // marginBottom: "1.5rem",
          height: "auto",
        },
      },
    });
    // }
  };

  const loadMore = () => {
    console.log("触发加载");
    loadImg();
  };

  const loadImg = () => {
    isLoadFinishAllImg.value = false;
    const allImgKeys = Object.keys(waterfallImages).filter(
      (_, index) =>
        index >= (pageIndex.value - 1) * pageSize &&
        index < pageIndex.value * pageSize
    );
    if (allImgKeys.length === 0) {
      removeInterObserver();
      isLoadFinishAllImg.value = true;
      isNoMore.value = true;
      return;
    }
    const allImgNum = allImgKeys.length;
    let loadedImgNum = 0; //加载好了几张图片
    let loadImgArr = [];
    allImgKeys.forEach((key) => {
      const img = new Image();
      img.onload = () => {
        const item = {
          width: columnWidth,
          height: (img.height * columnWidth) / img.width, //等比例缩小
          url: waterfallImages[key],
          uuid: buildUUID(),
        };
        loadImgArr.push(item);
        loadedImgNum++;
        if (loadedImgNum === allImgNum) {
          staticImgArr = staticImgArr.concat(loadImgArr);
          pageIndex.value++;
          isLoadFinishAllImg.value = true;
        }
      };
      img.src = waterfallImages[key];
    });
  };

  const computeNum = () => {
    console.log("231", wfCRefWidth.value);
    let computedNum = Math.floor(wfCRefWidth.value / columnWidth);

    if (computedNum === 0) {
      AMessage.warning("请至少要大于300宽度");
    } else if (computedNum > 1) {
      if (
        computedNum * columnWidth + (computedNum - 1) * minSpace >
        wfCRefWidth.value
      ) {
        computedNum--;
      }
    }
    listNum.value = computedNum;
  };

  const debounceComputeNum = useDebounceFn(() => {
    refreshObserver();
    computeNum();
  }, 300);

  const refreshObserver = () => {
    removeInterObserver();
    if (loadMoreRef.value) {
      createInterObserver(loadMoreRef.value, loadMore);
    }
  };

  const reArrange = () => {
    // console.log("aaa");
    if (listNum.value === 0) {
      isNoMore.value = true;
      return;
    }
    columnInfoList.value = [];
    let list = [];
    for (let i = 0; i < listNum.value; i++) {
      const item = {
        index: i,
        allHeight: 0,
        images: [],
      };
      list.push(item);
    }
    columnInfoList.value = list;
    if (staticImgArr.length) {
      console.log("bbb");
      staticImgArr.forEach((item) => {
        const minHeightArr = columnInfoList.value.map((item) => item.allHeight);
        const minIndex = findMindex(minHeightArr);
        // console.log("minIndex", minIndex);
        if (columnInfoList.value.length) {
          columnInfoList.value[minIndex].allHeight += item.height;
          columnInfoList.value[minIndex].images.push(item);
        }
      });
    }
    if (isNoMore.value) {
      removeInterObserver();
    } else {
      refreshObserver();
    }
  };

  const debounceReArrange = useDebounceFn(() => {
    // console.log("reArrange start");
    reArrange();
    // console.log("reArrange end");
  }, 350);

  watch(
    () => listNum.value,
    () => {
      //当窗口改变后计算，第一次计算需要等所有图片加载完
      console.log("listNum中isLoadFinishAllImg", isLoadFinishAllImg.value);
      if (isLoadFinishAllImg.value) {
        debounceReArrange();
      }
    }
  );

  watch(
    () => isLoadFinishAllImg.value,
    () => {
      if (isLoadFinishAllImg.value) {
        console.log("isLoadFinishAllImg改变值");
        debounceReArrange(); //第一次变化，也就是所有图片加载完
      }
    }
  );

  watch(
    () => wfCRefWidth.value,
    () => {
      console.log("111", wfCRefWidth.value);
      if (wfCRefWidth.value > 0) {
        debounceComputeNum();
      }
    },
    {
      immediate: true,
    }
  );
</script>

<style lang="scss" scoped>
  .container {
    width: 100%;
    height: 100%;
    background-color: #d4e9f1;
    display: flex;
    // justify-content: center;
    flex-direction: column;
    align-items: center;
    overflow-x: hidden;
    overflow-y: auto;
    .waterfall-container {
      width: 70%; //模拟数据
      display: flex;
      &.single-column {
        justify-content: center;
      }
      &.multiple-column {
        justify-content: space-between;
      }
      .column-list {
        width: v-bind(columnWidth) + "px";
        display: flex;
        flex-direction: column;
        img {
          margin-top: 14px;
          &:first-child {
            margin-top: 0;
          }
        }
      }
    }
    .load-more {
      width: 100%;
      text-align: center;
      margin-top: 8px;
      margin-bottom: 32px;
      // position: absolute;
      // left: 50%;
      // bottom: -100px;
      .more-text {
        color: #268213;
        font-size: 36px;
        font-weight: bold;
      }
    }
    .no-more {
      width: 100%;
      text-align: center;
      margin-top: 8px;
      margin-bottom: 32px;
      span {
        font-size: 36px;
        color: #cc4d00;
        font-weight: bold;
      }
    }
  }
</style>
