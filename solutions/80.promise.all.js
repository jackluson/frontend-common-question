/* 
1. Promise.all() 方法接收一个promise的iterable类型（注：Array，Map，Set都属于ES6的iterable类型）的输入，并且只返回一个Promise实例， 那个输入的所有promise的resolve回调的结果是一个数组。这个Promise的resolve回调执行是在所有输入的promise的resolve回调都结束，或者输入的iterable里没有promise了的时候。它的reject回调执行是，只要任何一个输入的promise的reject回调执行或者输入不合法的promise就会立即抛出错误，并且reject的是第一个抛出的错误信息。
2. 输出结果按照promise顺序输出
*/

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

Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    isIterable(promises, reject); // 判断是否是迭代对象
    let promiseRes = [];
    const promiseArray = [...promises];
    promiseArray.forEach(async (pr, index) => {
      if (!(pr instanceof Promise)) {
        pr = Promise.resolve(pr);
      }
      try {
        const temp = await pr;
        // promiseRes.push(temp);
        promiseRes.splice(index, 0, temp);
        if (promiseRes.length === promiseArray.length) {
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
let myMap = new Map();

let keyObj = {};
let keyFunc = function () {};
let keyString = "a string";

// 添加键
myMap.set(keyString, promise3);
myMap.set(keyObj, promise1);
myMap.set(keyFunc, promise2);
let iterable = new Set([promise3, promise1, promise2, promise3, 3]);
let arr = [promise3, promise1, promise2, promise3, 3];

Promise.myAll(arr)
  .then((values) => {
    console.log("values", values);
  })
  .catch((err) => {
    console.log("err", err);
  });
