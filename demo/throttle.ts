function throttle(fn: Function, delay: number): Function {
  let lastrun = 0;
  let timeout = 0;
  return function () {
    if(timeout) return;
    let elesped = Date.now() - lastrun;
    let context = this;
    let args = arguments;
    const runCallback = function () {
      lastrun = Date.now();
      timeout = 0;
      fn.apply(context, args);
    }
    if(elesped >= delay) {
      runCallback();
    } else {
      timeout = window.setTimeout(() => runCallback, delay);
    }
  }
}

function debunce(fn: Function, delay: number): Function {
  return function () {
    let args = arguments;
    let context = this;
    let timeout = null;
    if(timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(context, this)
    }, delay)
  };
}