//重组树形数据结构
export function formatTreeNode(node, level) {
  const treeData = { data: {}, children: [] };
  level = level || 1;
  if (node) {
    treeData.data = {
      text: node.name,
      code: node.code,
      uid: node.code,
      level: level,
    };
    if (node.children?.length) {
      node.children.forEach((item) => {
        treeData.children.push(formatTreeNode(item, level + 1));
      });
    }
    return treeData;
  } else {
    return;
  }
}
