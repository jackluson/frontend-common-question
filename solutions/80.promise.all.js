/* 
1. Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
2. 输出结果按照promise顺序输出
*/

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    let promiseRes = [];
    promises.forEach(async (pr, index) => {
      if (!(pr instanceof Promise)) {
        pr = pr;
      }
      try {
        const temp = await pr;
        // promiseRes.push(temp);
        promiseRes.splice(index, 0, temp);
        if (promiseRes.length === promises.length) {
          resolve(promiseRes);
        }
      } catch (error) {
        reject(error);
      }
    });
  });
};

const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});
// const pErr = new Promise((resolve, reject) => {
//   reject("总是失败");
// });

Promise.myAll([promise3, promise2, promise1])
  .then((values) => {
    console.log(values);
  })
  .catch((err) => {
    console.log("err", err);
  });
