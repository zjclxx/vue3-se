const Particle_MIN_RADIUS = 4;
const Particle_MAX_RADIUS = 7;

let ctx = null;
let canvas = null;
function getRandom(min, max) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
}

const colorArr = ["#585858ff", "#6a6a6bff", "#494949ff", "#606263ff"];
let moveRAFId = null;
let drawRAFId = null;

// 粒子类
class Particle {
  constructor() {
    const radius = getRandom(Particle_MIN_RADIUS, Particle_MAX_RADIUS);
    this.radius = radius;

    const bigRadius = Math.min(canvas.width, canvas.height) / 2;
    const rad = (getRandom(0, 360) * Math.PI) / 180;
    const cx = canvas.width / 2 - 50;
    const cy = canvas.height / 2 - 50;
    this.x = cx + bigRadius * Math.cos(rad);
    this.y = cy + bigRadius * Math.sin(rad);
    const color = colorArr[getRandom(0, colorArr.length - 1)];
    this.color = color;
  }
  draw() {
    ctx.beginPath(); // 开始新的路径
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI); // x, y, 半径, 开始角度, 结束角度
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  moveTo(x, y) {
    const duration = 500; //500ms运动时间
    const sx = this.x;
    const sy = this.y;
    const xSpeed = (x - sx) / duration;
    const ySpeed = (y - sy) / duration;
    const startTime = Date.now();
    const _move = () => {
      const t = Date.now() - startTime;
      const tx = sx + xSpeed * t;
      const ty = sy + ySpeed * t;
      this.x = tx;
      this.y = ty;
      if (t >= duration) {
        this.x = x;
        this.y = y;
        return;
      }
      moveRAFId = requestAnimationFrame(_move);
    };
    _move();
  }
}

let text = null;
const particles = [];

function getText() {
  return new Date().toTimeString().substring(0, 8);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  // 1.画文字
  const curText = getText();
  if (text === curText) {
    return;
  }
  clear();
  text = curText;
  const { width, height } = canvas;
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.textBaseline = "middle";
  ctx.font = `${150 * devicePixelRatio}px 'Roboto Mono', sans-serif`;
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height / 2);
  // 2.拿到像素信息
  const points = getPoints();
  clear();
  for (let i = 0; i < points.length; i++) {
    const { x, y } = points[i];
    let p = particles[i];
    if (!p) {
      p = new Particle();
      particles.push(p);
    }
    p.moveTo(x, y);
  }
  if (points.length < particles.length) {
    particles.splice(points.length);
  }
}

function getPoints() {
  const points = [];
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  const gap = 6;
  for (let i = 0; i < canvas.width; i += gap) {
    for (let j = 0; j < canvas.width; j += gap) {
      const index = (i + j * canvas.width) * 4;
      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];
      const a = data[index + 3];
      if (r === 0 && g === 0 && b === 0 && a === 255) {
        points.push({
          x: i,
          y: j,
        });
      }
    }
  }
  return points;
}

function draw() {
  clear();
  update(); //时钟数字变化后计算需要多少个粒子更新 可能变少 可能变多
  for (const p of particles) {
    p.draw();
  }
  drawRAFId = requestAnimationFrame(draw);
}

export function stopRAF() {
  cancelAnimationFrame(moveRAFId);
  cancelAnimationFrame(drawRAFId);
}

export function init() {
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d", {
    willReadFrequently: true,
  });
  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  draw();
}
// draw();
