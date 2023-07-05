const docEl = document.documentElement;
const fly = document.createElement('div');

fly.style.cssText = `
  position: fixed;
  width: 50px;
  height: 50px;
  top: 0;
  left: 0;
  pointer-event: none;
  background: url('../image/fly.svg') center/contain no-repeat;
`;

document.body.append(fly);

// вычислить нахождение самолета в зависимости от положения скролла
const calcPositionFly = () => {
  // размер скролла минус размер элемента
  // (чтобы картинка не ушла за границы видимости)
  const maxLeft = docEl.scrollWidth - fly.clientWidth;
  // сколько высоты можно проскроллить
  const maxScroll = docEl.scrollHeight - docEl.clientHeight;
  // на сколько % нужно переместить самолт, чтобы он соответствовал скроллу
  const persentScroll = (window.pageYOffset * 100) / maxScroll;
  // сколько из maxLeft необходимо прокрутить в px
  const left = maxLeft * (persentScroll / 100);

  fly.style.transform = `translateX(${left}px)`;
};

window.addEventListener('scroll', () => {
  requestAnimationFrame(calcPositionFly);
});

// вызываем для определения первоначального положения самолета
calcPositionFly();