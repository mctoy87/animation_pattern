// начало время выполнения анима
let startTime = NaN;
// время работы анима
const durationFly = 700;
// время исчезновения оверлэй
const durationOpacity = 300;

let left = 0;

const overlay = document.createElement('div');


overlay.style.cssText = `
  position: fixed;
  top: 0;
  bottom: 0; 
  left: 0;
  right: 0;
  background-color: black;
  opacity: 1;
  z-index: 999;
`;


const fly = document.createElement('div');

fly.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  top: calc(50% - 25px);
  left: ${left};
  background: url('../image/fly.svg') center/contain no-repeat;
`;

overlay.append(fly);
document.body.append(overlay);

// anime
const hideOverlay = (timestamp) => {
  // когда произошел старт анима (см. ниже код - описание)
  startTime ||= timestamp;
  // прогресс выполнения анима
  const progress = (timestamp - startTime) / durationOpacity;
  overlay.style.opacity = 1 - progress;

  if (progress < 1) {
    requestAnimationFrame(hideOverlay);
  } else {
    overlay.remove();
  }
};

const stepFly = (timestamp) => {
  // когда произошел старт анима
  // timestamp - время в млс от того момента, когда загрузилась страница
  if (!startTime) {
    startTime = timestamp;
  }
  // startTime ||= timestamp - это тоже самое что и выше if
  // прогресс выполнения анима (на основе startTime, timestam, durationFly)
  const progress = (timestamp - startTime) / durationFly;
  // нужно чтобы самолет пролетел все расстояние scrollWidth
  left = document.documentElement.scrollWidth * progress;
  fly.style.transform = `translateX(${left}px)`;
  if (progress < 1) {
    requestAnimationFrame(stepFly);
  } else {
    // обнуляем startTime когда звкончилась анима
    startTime = NaN;
    requestAnimationFrame(hideOverlay);
  }
};

requestAnimationFrame(stepFly);

