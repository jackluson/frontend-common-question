Promise.myAllSettled = function (alls) {
  return new Promise(async (resolve, reject) => {
    const res = [];
    alls.forEach(async (pr, index) => {
      try {
        const value = await pr;
        res.splice(index, 0, { status: "fulfilled", value });
        if (res.length === alls.length) {
          resolve(res);
        }
      } catch (reason) {
        res.splice(index, 0, { status: "rejected", reason });
        if (res.length === alls.length) {
          resolve(res);
        }
      }
    });
  });
};

const pErr = new Promise((resolve, reject) => {
  reject("总是失败");
});

const pSlow = new Promise((resolve, reject) => {
  setTimeout(resolve, 500, "最终完成");
});

const pFast = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "很快完成");
});

Promise.myAllSettled([pErr, pSlow, pFast]).then((value) => {
  console.log(value);
});
