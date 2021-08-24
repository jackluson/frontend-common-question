/* Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。 */

const isIterable = (data, reject) => {
  const type = typeof data;
  if (!data[Symbol.iterator]) {
    if (reject) {
      reject(
        new TypeError(
          `${type} ${data} is not iterable (cannot read property Symbol(Symbol.iterator))`
        )
      );
    } else {
      throw new TypeError(
        `${type} ${data} is not iterable (cannot read property Symbol(Symbol.iterator))`
      );
    }
  }
};
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    isIterable(promises, reject); // 判断是否是迭代对象
    const promiseArray = [...promises];
    promiseArray.forEach((pr) => {
      if (!(pr instanceof Promise)) {
        pr = Promise.resolve(pr);
      }
      pr.then(resolve, reject);
    });
  });
};

const promise1 = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, "two");
});

Promise.myRace([promise1, promise2])
  .then((value) => {
    console.log("value", value);
    // Both resolve, but promise2 is faster
  })
  .catch((err) => {
    console.log("err", err);
  });
