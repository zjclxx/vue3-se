const textData = {
  text: "人工智能",
  children: [
    {
      text: "应用层",
      isActive: true,
      children: [
        {
          text: "人工智能行业应用",
          children: [
            { text: "你好" },
            { text: "world" },
            { text: "动态内容" },
            { text: "Horizontal", isActive: true },
            { text: "塞尔达传送" },
            { text: "人工智能" },
          ],
        },
      ],
    },
  ],
};

const defaultBorderColor = "#b7b5b2"; //默认边框颜色
const activeBorderColor = "#1764FF"; //关系线之间的边框颜色

// 装饰参数
const dashHeight = 18; // 向下虚线的高度（单侧）
const dotDiameter = 6; // 圆点直径
const svgMarginTop = 10; // SVG顶部的间距
const svgMarginBottom = 10; // SVG底部的间距
const decorColor = "#999"; // 装饰颜色（灰色）
const padding = 20;
const cornerRadius = 10;
const fontSize = 16;
const spacing = 30;

// 区分叶子节点和根节点
function getSplitLeafAndRhizome(textData) {
  const leafChildren = [];
  const rhizomeList = [];

  function traverse(node) {
    if (node.children && node.children.length > 0) {
      const { text, isActive } = node;
      rhizomeList.unshift({
        text,
        defaultBorderColor,
        isActive,
      });
      node.children.forEach((child) => {
        traverse(child);
      });
    } else {
      leafChildren.push(node);
    }
  }
  traverse(textData);

  return {
    leafChildren,
    rhizomeList,
  };
}

function createHorizontalSVG(textData) {
  const { leafChildren, rhizomeList } = getSplitLeafAndRhizome(textData);
  if (!leafChildren.length) return;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.font = `${fontSize}px Arial`;

  let currentX = 20;
  const elements = leafChildren.map((item) => {
    const textWidth = ctx.measureText(item.text).width;
    const width = textWidth + 2 * padding;
    const height = fontSize * 2.5;

    // 顶部装饰高度（圆点 + 水平虚线布局空间）
    const topDecorHeight =
      svgMarginTop +
      dashHeight * rhizomeList.length +
      height * rhizomeList.length;
    // 矩形顶部的Y坐标（顶部装饰底部 + 向下虚线）
    const rectY = topDecorHeight + dashHeight;

    const element = {
      ...item,
      width,
      height,
      x: currentX,
      y: rectY,
      textX: currentX + padding,
      textY: rectY + height / 2 + fontSize / 3,
      // 装饰坐标
      dashX1: currentX + width / 2, // 虚线起点X（居中）
      dashY1: topDecorHeight, // 虚线起点Y（从顶部装饰底部开始）
      dashX2: currentX + width / 2, // 虚线终点X
      dashY2: rectY, // 虚线终点Y（连接到矩形顶部）
      dotX: currentX + width / 2, // 圆点X（与虚线同中线）
      dotY: rectY - dashHeight, // 圆点Y（考虑圆点半径）
    };

    currentX += width + spacing;
    return element;
  });

  // SVG高度 = 顶部装饰高度 + 向下虚线 + 矩形高度 + 向上虚线高度 + 底部间距
  const svgHeight =
    Math.max(...elements.map((el) => el.y + el.height)) +
    dashHeight * 2 +
    svgMarginBottom;
  const svgWidth = currentX;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", svgWidth);
  svg.setAttribute("height", svgHeight);
  svg.setAttribute("viewBox", `0 0 ${svgWidth} ${svgHeight}`);

  // 1. 绘制连接所有圆点的水平虚线
  const dotsConnector = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  dotsConnector.setAttribute("x1", elements[0].dotX);
  dotsConnector.setAttribute("y1", elements[0].dotY); // 圆点中线
  dotsConnector.setAttribute("x2", elements[elements.length - 1].dotX);
  dotsConnector.setAttribute("y2", elements[0].dotY);
  dotsConnector.setAttribute("stroke", decorColor);
  dotsConnector.setAttribute("stroke-width", "1");
  dotsConnector.setAttribute("stroke-dasharray", "3,3");
  svg.appendChild(dotsConnector);

  // 2. 新增：在水平虚线中点上方添加向上虚线
  const midPointX = (elements[0].dotX + elements[elements.length - 1].dotX) / 2;
  const upwardDash = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  upwardDash.setAttribute("x1", midPointX);
  upwardDash.setAttribute("y1", elements[0].dotY); // 水平虚线中点
  upwardDash.setAttribute("x2", midPointX);
  upwardDash.setAttribute("y2", elements[0].dotY - dashHeight); // 向上延伸
  upwardDash.setAttribute("stroke", decorColor);
  upwardDash.setAttribute("stroke-width", "1");
  upwardDash.setAttribute("stroke-dasharray", "3,3");
  svg.appendChild(upwardDash);

  // 最下面的activeNode
  let bottomLayerActiveNode;

  elements.forEach((el) => {
    // 添加装饰元素（灰色圆点 + 竖直虚线）
    const dot = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle"
    );
    dot.setAttribute("cx", el.dotX);
    dot.setAttribute("cy", el.dotY);
    dot.setAttribute("r", dotDiameter / 2);
    dot.setAttribute("fill", decorColor);

    const dashLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    dashLine.setAttribute("x1", el.dashX1);
    dashLine.setAttribute("y1", el.dashY1);
    dashLine.setAttribute("x2", el.dashX2);
    dashLine.setAttribute("y2", el.dashY2);
    dashLine.setAttribute("stroke", decorColor);
    dashLine.setAttribute("stroke-width", "1");
    dashLine.setAttribute("stroke-dasharray", "3,3");

    // 添加原有矩形和文字
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", el.x);
    rect.setAttribute("y", el.y);
    rect.setAttribute("width", el.width);
    rect.setAttribute("height", el.height);
    rect.setAttribute("rx", cornerRadius);
    rect.setAttribute("ry", cornerRadius);
    rect.setAttribute("fill", "none");
    if (el.isActive) {
      rect.setAttribute("stroke", activeBorderColor);
      bottomLayerActiveNode = el;
    } else {
      rect.setAttribute("stroke", defaultBorderColor);
    }
    rect.setAttribute("stroke-width", "2");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", el.textX);
    text.setAttribute("y", el.textY);
    text.setAttribute("font-size", fontSize.toString());
    text.setAttribute("fill", "#000000");
    text.textContent = el.text;

    svg.appendChild(dot);
    svg.appendChild(dashLine);
    svg.appendChild(rect);
    svg.appendChild(text);
  });

  let topNodes = [];
  let topActiveIndex = -1;

  // 3.绘制上面的节点
  rhizomeList.forEach((rhizome, index) => {
    const textWidth = ctx.measureText(rhizome.text).width;
    const width = textWidth + 2 * padding;
    const height = fontSize * 2.5;
    const x = midPointX - width / 2;
    const y =
      elements[0].dotY - dashHeight * (index + 1) - height * (index + 1);
    topNodes.push({
      x: x,
      y: y,
      width: width,
      height: height,
    });
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", x);
    rect.setAttribute("y", y);
    rect.setAttribute("width", width);
    rect.setAttribute("height", height);
    rect.setAttribute("rx", cornerRadius);
    rect.setAttribute("ry", cornerRadius);
    rect.setAttribute("fill", "none");
    if (rhizome.isActive) {
      rect.setAttribute("stroke", activeBorderColor);
      topActiveIndex = index;
    } else {
      rect.setAttribute("stroke", defaultBorderColor);
    }
    rect.setAttribute("stroke-width", "2");

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");

    text.setAttribute("x", x + padding);
    text.setAttribute("y", y + height / 2 + fontSize / 3);
    text.setAttribute("font-size", fontSize.toString());
    text.setAttribute("fill", "#000000");
    text.textContent = rhizome.text;

    svg.appendChild(rect);
    svg.appendChild(text);

    if (index !== 0) {
      const dashLine = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      dashLine.setAttribute("x1", midPointX);
      dashLine.setAttribute("y1", y + height);
      dashLine.setAttribute("x2", midPointX);
      dashLine.setAttribute("y2", y + height + dashHeight);
      dashLine.setAttribute("stroke", decorColor);
      dashLine.setAttribute("stroke-width", "1");
      dashLine.setAttribute("stroke-dasharray", "3,3");
      svg.appendChild(dashLine);
    }
  });

  // 4.绘制关系线
  // (一)横长线
  const aviceNodeCenterX =
    bottomLayerActiveNode.x + bottomLayerActiveNode.width / 2;
  const relationLine1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  relationLine1.setAttribute("x1", midPointX);
  relationLine1.setAttribute("y1", bottomLayerActiveNode.y - dashHeight);
  relationLine1.setAttribute("x2", aviceNodeCenterX);
  relationLine1.setAttribute("y2", bottomLayerActiveNode.y - dashHeight);
  relationLine1.setAttribute("stroke", activeBorderColor);
  relationLine1.setAttribute("stroke-width", "1.4");
  svg.appendChild(relationLine1);

  // (二)与最下面的active竖线
  const relationLine2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "line"
  );
  relationLine2.setAttribute("x1", aviceNodeCenterX);
  relationLine2.setAttribute("y1", bottomLayerActiveNode.y);
  relationLine2.setAttribute("x2", aviceNodeCenterX);
  relationLine2.setAttribute("y2", bottomLayerActiveNode.y - dashHeight);
  relationLine2.setAttribute("stroke", activeBorderColor);
  relationLine2.setAttribute("stroke-width", "1.4");
  svg.appendChild(relationLine2);

  // (三)与最上面的active竖线
  let totalRectHeight = 0;
  const formatList = topNodes.filter((_x, i) => i <= topActiveIndex);
  for (let i = 0; i < formatList.length; i++) {
    const shortRelationLine = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "line"
    );
    const item = formatList[i];
    const y1 =
      bottomLayerActiveNode.y - dashHeight - i * dashHeight - totalRectHeight;
    shortRelationLine.setAttribute("x1", midPointX);
    shortRelationLine.setAttribute("y1", y1);
    shortRelationLine.setAttribute("x2", midPointX);
    shortRelationLine.setAttribute("y2", y1 - dashHeight);
    shortRelationLine.setAttribute("stroke", activeBorderColor);
    shortRelationLine.setAttribute("stroke-width", "1.4");
    totalRectHeight += item.height;
    svg.appendChild(shortRelationLine);
  }
  return svg;
}

let isKeyPressed = false;
let startX, startY, dx, dy;
let finishDx = 0;
let finishDy = 0;
let scale = 1;
let result;
function handleObserveMouseDown(e) {
  // console.log("鼠标按下");
  isKeyPressed = true;
  startX = e.clientX; // 记录鼠标按下时的X坐标
  startY = e.clientY; // 记录鼠标按下时的Y坐标
}
function handleObserveMouseMove(e) {
  if (isKeyPressed) {
    // console.log("鼠标移动svg", e);
    dx = e.clientX - startX; // 计算水平方向上的移动距离
    dy = e.clientY - startY; // 计算垂直方向上的移动距离
    if (result) {
      result.style.transform = `translate(calc(-50% + ${finishDx + dx}px),  ${
        finishDy + dy
      }px) scale(${scale})`;
    }
  }
}
function handleObserveMouseLeave(e) {
  // console.log("移出svg");
  isKeyPressed = false;
}
function handleObserveMouseUp(e) {
  // console.log("鼠标抬起svg");
  isKeyPressed = false;
  finishDx += e.clientX - startX;
  finishDy += e.clientY - startY;
}
function handleObserveMouseWhell(e) {
  // console.log("鼠标滚轮svg", e);
  if (e.deltaY < 0) {
    if (scale >= 3) return;
    scale += 0.2;
  } else {
    if (scale <= 0.6) return;
    scale -= 0.2;
  }
  if (result) {
    result.style.transform = `translate(calc(-50% + ${finishDx}px),  ${finishDy}px) scale(${scale})`;
  }
}

// 初始化
export function init() {
  result = createHorizontalSVG(textData);
  if (result) {
    result.setAttribute("class", "mind-map-svg");
    const dom = document.getElementById("svg-container");
    dom.appendChild(result);
    // result.addEventListener("mouseenter", (e) => {
    //   console.log("进入svg");
    // });
    result.addEventListener("mousedown", handleObserveMouseDown);
    result.addEventListener("mousemove", handleObserveMouseMove);
    result.addEventListener("mouseleave", handleObserveMouseLeave);
    result.addEventListener("mouseup", handleObserveMouseUp);
    result.addEventListener("wheel", handleObserveMouseWhell);
  }
}

// 销毁监听
export function destroy() {
  finishDx = 0;
  finishDy = 0;
  scale = 1;
  if (result) {
    result.removeEventListener("mousedown", handleObserveMouseDown);
    result.removeEventListener("mousemove", handleObserveMouseMove);
    result.removeEventListener("mouseleave", handleObserveMouseLeave);
    result.removeEventListener("mouseup", handleObserveMouseUp);
    result.removeEventListener("wheel", handleObserveMouseWhell);
    result = null;
  }
}

// 回到原位
export function returnOrigin() {
  finishDx = 0;
  finishDy = 0;
  scale = 1;
  if (result) {
    result.style.transform = `translate(calc(-50% + 0px),  0px) scale(1)`;
  }
}
