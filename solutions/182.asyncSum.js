function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

// async function sum(a, b) {
//   return new Promise((resolve, reject) => {
//     asyncAdd(a, b, (_, data) => {
//       if (_) return reject();
//       resolve(data);
//     });
//   });
// }

async function sum(...args) {
  return new Promise(async (outResolve, outReject) => {
    const res = await args
      .reduce(async (pre, cur) => {
        pre = await pre;
        const temp = await new Promise((resolve, reject) => {
          asyncAdd(pre, cur, (error, data) => {
            if (error) reject();
            resolve(data);
          });
        });
        return temp;
      }, Promise.resolve(0))
      .catch(() => {
        outReject("error");
      });
    outResolve(res);
  });
}

async function main() {
  const res = await sum(1, 2, 3);
  console.log("res", res);
}

main();
