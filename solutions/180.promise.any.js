Promise.myAny = function (alls) {
  return new Promise(async (resolve, reject) => {
    const errInfo = {
      name: "All promises were rejected",
      message: "AggregateError",
      errors: [],
    };
    // let isResolve = false;
    // for (let i = 0; i < alls.length && !isResolve; i++) {
    //   const pr = alls[i];
    //   try {
    //     resolveRes = await pr;
    //     isResolve = true;
    //     // resolve(res);
    //   } catch (err) {
    //     errInfo.errors.push(err);
    //   }
    // }
    alls.forEach(async (pr) => {
      try {
        const tempRes = await pr;
        resolve(tempRes);
      } catch (err) {
        errInfo.errors.push(err);
        if (errInfo.errors.length === alls.length) {
          reject(errInfo);
        }
      }
    });
  });
};

const promises = [
  Promise.reject("ERROR A"),
  Promise.resolve("resultA"),
  Promise.reject("ERROR B"),
  // Promise.resolve("result"),
];

Promise.myAny(promises)
  .then((value) => {
    console.log("value: ", value);
  })
  .catch((err) => {
    console.log("err: ", err);
  });

const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.myAny([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
  // pFast fulfils first
});
