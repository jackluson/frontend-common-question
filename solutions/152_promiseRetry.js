Promise.prototype.retry = function (fn, count) {
  return new Promise(async (resolve, reject) => {
    let errorInfo;
    for (let index = 0; index < count; index++) {
      try {
        const result = await fn(index);
        console.log("result", result);
        return resolve(result);
      } catch (error) {
        errorInfo = error;
      }
    }
    reject(errorInfo);
  });
};

function getProm() {
  const n = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => (n > 0.6 ? resolve(n) : reject(n)), 1000);
  });
}

const p = new Promise((resolve, reject) => {
  resolve(2);
});
p.retry(getProm, 3)
  .then((res) => {
    console.log("res", res);
  })
  .catch((res) => {
    console.log("catch", res);
  });

// Promise.retry(getProm, 3)
//   .then((res) => {
//     console.log("res1", res);
//   })
//   .catch((res) => {
//     console.log("catch", res);
//   });
