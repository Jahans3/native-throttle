module.exports = function throttle(func, {
  limit = 300,
  leading = true,
  trailing = false,
  context = this,
} = {}) {
  let wait = false;
  let lastSuccessfulCall = new Date().getTime();

  function invoke(...args) {
    const callTime = new Date().getTime();
    let result;

    if (leading && !trailing) {
      result = func.call(context, ...args);
    }

    setTimeout(() => {
      wait = false;
    }, limit);

    if (trailing && (callTime - lastSuccessfulCall) > limit) {
      result = func.call(context, ...args);
      lastSuccessfulCall = callTime;
    }

    return result;
  }

  function throttledFunc(...args) {
    if (!wait) {
      wait = true;

      return invoke(...args);
    }
  }

  return throttledFunc;
};
