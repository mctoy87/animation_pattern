// Анима при наведении
// Паттерн 'debounce' - он не даст вызывать ф-ю чаще чем requestAnimationFrame сработает
// т.е. позволяет сократить количество вызовов анимы, которую не сожем воспроизвсти
// Сколько раз вызывается ф-я при наведении мыши на эл-т
let count = 0;
// кол-во вызовов без debounce
let count2 = 0;

// оборачивает в анонимную ф-ю другую ф-ю fn
const debounce = (fn) => {
  // задаем переменную чтобы не было лишних незапланированных requestAnimationFrame
  let raf = NaN;
  return (...args) => {
    console.log('count2 :', count2++);
    // если наш таймер есть то выполним return
    if (raf) return;

    raf = requestAnimationFrame(() => {
      fn(...args);
      raf = NaN;
    });
  };
};

const handle = () => {
  console.log('count :', count++);
};

const debounceHandle = debounce(handle);

const circle = document.querySelector('.circle');

circle.addEventListener('mousemove', debounceHandle);