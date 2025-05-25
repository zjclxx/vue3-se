//------------------------以下是webpack中使用的---------------------------------------------------
// const requireAll = (requireContext) =>
//   requireContext.keys().map(requireContext);

// // 调整路径和正则表达式以匹配你的需求
// const images = requireAll(
//   require.context("../assets/images/waterfall", false, /\.jpg$/)
// );

/**
 * 导出图片数组供其他文件使用。注意：这将是一个包含模块对象的数组，不是URLs。如果你需要URLs，
 * 可以使用下面的方法：`images.map(m => m.default)`。但通常直接使用模块对象也没问题。
 * 如果需要URLs，可以这样处理：`images.map(m => m && m.default)`。
 * 确保处理了可能的undefined值。`m && m.default`确保如果某个文件不存在则不会抛出错误。
 * `m && m.default`确保即使模块中没有默认导出也能正确处理。
 */

//-----------------------------以下是vite特有的----------------------------------------
const images = import.meta.glob("../assets/images/waterfall/*.jpg", {
  eager: true,
  import: "default",
});

export default images;
