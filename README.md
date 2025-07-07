# Vue 3 + vite

当前项目不但包含瀑布流：
使用 vite 独有 import.meta.glob 来动态引入该目录下所有指定的类型文件，
本项目是 assets/images/waterfall 中所有的 jpg 文件，并使用瀑布流展示，
具有响应式，模拟分页加载，下拉到出现[加载中...]元素的情况下，
用 IntersectionObserver 与视口交叉监听触发

还有其他一些效果展示，如：
视差滚动、圆形椭圆 div 排列、气泡效果等。
