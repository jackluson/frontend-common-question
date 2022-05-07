function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
      timer = null;
    }, delay);
  };
}

function throttle(fn, delay) {
  let canRun = false;
  return (...args) => {
    if (canRun) return;
    canRun = setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  };
}
