import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    rediect: "/guide",
    component: () => import("@/views/guide/index.vue"),
    name: "Guide",
  },
  {
    path: "/waterFall",
    component: () => import("@/views/waterFall/index.vue"),
    name: "WaterFall",
  },
  {
    path: "/honeycomb",
    component: () => import("@/views/honeycomb/index.vue"),
    name: "Honeycomb",
  },
  {
    path: "/parallax",
    component: () => import("@/views/parallax/index.vue"),
    name: "Parallax",
  },
  {
    path: "/surroundingBall",
    component: () => import("@/views/surroundingBall/index.vue"),
    name: "SurroundingBall",
  },
  {
    path: "/bubblePage",
    component: () => import("@/views/bubblePage/index.vue"),
    name: "BubblePage",
  },
  {
    path: "/circularArrangement",
    component: () => import("@/views/circularArrangement/index.vue"),
    name: "CircularArrangement",
  },
  {
    path: "/animationText",
    component: () => import("@/views/animationText/index.vue"),
    name: "AnimationText",
  },
  {
    path: "/sandClock",
    component: () => import("@/views/sandClock/index.vue"),
    name: "SandClock",
  },
  {
    path: "/compassClock",
    component: () => import("@/views/compassClock/index.vue"),
    name: "CompassClock",
  },
  {
    path: "/imgThroughText",
    component: () => import("@/views/imgThroughText/index.vue"),
    name: "ImgThroughText",
  },
  {
    path: "/border",
    component: () => import("@/views/border/index.vue"),
    name: "Border",
  },
  {
    path: "/mindMap",
    component: () => import("@/views/mindMap/index.vue"),
    name: "MindMap",
  },
  {
    path: "/morphSvg",
    component: () => import("@/views/morphSvg/index.vue"),
    name: "MorphSvg",
  },
  {
    path: "/luckWheel",
    component: () => import("@/views/luckWheel/index.vue"),
    name: "LuckWheel",
  },
  {
    path: "/cutFile",
    component: () => import("@/views/cutFile/index.vue"),
    name: "CutFile",
  },
  // {
  //   path: "/404",
  //   component: () => import("@/views/404"),
  //   hidden: true,
  // },
  {
    path: "/:pathMatch(.*)", // 注意这里的路径写法
    name: "catchAll", // 必须命名为 'catchAll'
    rediect: "/404",
    component: () => import("@/views/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
