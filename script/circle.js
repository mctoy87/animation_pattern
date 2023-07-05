const duration = 1000;
const distance = 500;
// requestAnimationFrame также как таймеры возвращает id
let requestId = NaN;

const circle = document.querySelector('.circle');
const start = document.querySelector('.start');
const stop = document.querySelector('.stop');

// foo высшего порядка (обертка над ф-ей requestAnimationFrame)

const startAnimation = (duration, callback) => {
  let startAnimation = NaN;

  requestId = requestAnimationFrame(function step(timestamp) {
    startAnimation ||= timestamp;

    const progress = (timestamp - startAnimation) / duration;
    // вызываем cb, вычисляем перемещение и перемещаем
    callback(progress);

    if (progress < 1) {
      requestId = requestAnimationFrame(step);
    }
  });
};

const easyInOut = time => 0.5 * (1 - Math.cos(Math.PI * time));

start.addEventListener('click', () => {
  startAnimation(duration, (progress) => {
    // на сколько хотим переместить эл-т
    const left = easyInOut(progress) * distance;
    circle.style.transform = `translateX(${left}px)`;
  });
});

stop.addEventListener('click', () => {
  cancelAnimationFrame(requestId);
});
