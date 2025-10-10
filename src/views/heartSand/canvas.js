const setting = {
  length: 500, // 最大颗粒数量
  duration: 2, // 粒子持续时间（秒）
  velocity: 100, // 粒子速度（像素/秒）
  effect: -0.75, // 消失方向和时间
  size: 30, // 像素尺寸
};

const isModernBrowser = () =>
  typeof window !== "undefined" && !!window.requestAnimationFrame;

class Point {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }

  normalize() {
    const length = this.getLength();
    this.x /= length;
    this.y /= length;
    return this;
  }
  getLength(length) {
    if (length) {
      this.normalize();
      this.x *= length;
      this.y *= length;
      return this;
    } else {
      return Math.sqrt(this.x * this.x + this.y * this.y);
    }
  }
  clone() {
    return new Point(this.x, this.y);
  }
}

class Particle {
  constructor() {
    this.position = new Point();
    this.velocity = new Point();
    this.acceleration = new Point();
    this.age = 0;
  }

  initialize(x, y, dx, dy) {
    this.position.x = x;
    this.position.y = y;
    this.velocity.x = dx;
    this.velocity.y = dy;
    this.acceleration.x = dx * setting.effect;
    this.acceleration.y = dy * setting.effect;
    this.age = 0;
  }

  update(deltaTime) {
    this.position.x += this.velocity.x * deltaTime;
    this.position.y += this.velocity.y * deltaTime;
    this.velocity.x += this.acceleration.x * deltaTime;
    this.velocity.y += this.acceleration.y * deltaTime;
    this.age += deltaTime;
  }
  draw(context, image) {
    const size = image.width * ease(this.age / setting.duration);
    context.globalAlpha = 1 - this.age / setting.duration;
    context.drawImage(
      image,
      this.position.x - size / 2,
      this.position.y - size / 2,
      size,
      size
    );
  }
}

function ease(t) {
  return --t * t * t + 1;
}

let particles;
let firstActive = 0;
let firstFree = 0;
let duration = setting.duration;
class ParticlePool {
  constructor(length) {
    particles = new Array(length);
    for (let i = 0; i < particles.length; i++) {
      particles[i] = new Particle();
    }
  }

  add(x, y, dx, dy) {
    particles[firstFree].initialize(x, y, dx, dy);
    firstFree++;
    if (firstFree == particles.length) firstFree = 0;
    if (firstActive == firstFree) firstActive++;
    if (firstActive == particles.length) firstActive = 0;
  }

  update(deltaTime) {
    let i = 0;

    // 更新活跃粒子
    if (firstActive < firstFree) {
      for (i = firstActive; i < firstFree; i++) {
        particles[i].update(deltaTime);
      }
    }
    if (firstFree < firstActive) {
      for (i = firstActive; i < particles.length; i++)
        particles[i].update(deltaTime);
      for (i = 0; i < firstFree; i++) {
        particles[i].update(deltaTime);
      }
    }

    // 移除非活跃粒子
    while (particles[firstActive].age >= duration && firstActive != firstFree) {
      firstActive++;
      if (firstActive == particles.length) {
        firstActive = 0;
      }
    }
  }
  draw(context, image) {
    if (firstActive < firstFree) {
      for (let i = firstActive; i < firstFree; i++) {
        particles[i].draw(context, image);
      }
    }
    if (firstFree < firstActive) {
      for (let i = firstActive; i < particles.length; i++) {
        particles[i].draw(context, image);
      }
      for (let i = 0; i < firstFree; i++) {
        particles[i].draw(context, image);
      }
    }
  }
}

let time;
const particleRate = setting.length / setting.duration;
let rAFId = null;
let canvas = null;
let context = null;
const image = new Image();

//入口函数
export function init() {
  if (!isModernBrowser()) {
    alert("浏览器不支持动画api");
    return;
  }
  particles = new ParticlePool(setting.length);

  canvas = document.getElementById("pinkboard");
  context = canvas.getContext("2d");

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;

  context.beginPath();
  let t = -Math.PI;
  let point = getToPoint(t);
  context.moveTo(point.x, point.y);
  while (t < Math.PI) {
    t += 0.01; // baby steps!
    point = getToPoint(t);
    context.lineTo(point.x, point.y);
  }
  context.closePath();
  context.fillStyle = "#ea80b0";
  context.fill();
  image.src = canvas.toDataURL();
  render();
}

function render() {
  // next animation frame
  rAFId = requestAnimationFrame(render);

  // update time
  const newTime = new Date().getTime() / 1000;
  const deltaTime = newTime - (time || newTime);
  time = newTime;

  // clear canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // create new particles
  const amount = particleRate * deltaTime;
  for (let i = 0; i < amount; i++) {
    const pos = pointOnHeart(Math.PI - 2 * Math.PI * Math.random());
    const dir = pos.clone().getLength(setting.velocity);
    particles.add(
      canvas.width / 2 + pos.x,
      canvas.height / 2 - pos.y,
      dir.x,
      -dir.y
    );
  }

  // update and draw particles
  particles.update(deltaTime);
  particles.draw(context, image);
}

// 在-PI <= t <= PI的范围内，获取心脏上的点
function pointOnHeart(t) {
  return new Point(
    160 * Math.pow(Math.sin(t), 3),
    130 * Math.cos(t) -
      50 * Math.cos(2 * t) -
      20 * Math.cos(3 * t) -
      10 * Math.cos(4 * t) +
      25
  );
}

function getToPoint(t) {
  const point = pointOnHeart(t);
  point.x = setting.size / 2 + (point.x * setting.size) / 350;
  point.y = setting.size / 2 - (point.y * setting.size) / 350;
  return point;
}

export function resize() {
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
}

export function stopRAF() {
  cancelAnimationFrame(rAFId);
}
