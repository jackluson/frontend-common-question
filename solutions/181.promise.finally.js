/*
 * Desc:
 * File: /solutions/181.promise.finally.js
 * Project: frontend-common-question
 * File Created: Tuesday, 24th August 2021 10:57:39 am
 * Author: luxuemin2108@gmail.com
 * -----
 * Copyright (c) 2020 Camel Lu
 */

Promise.prototype.myFinally = async function (cb) {
  const pr = this;
  try {
    await pr;
  } finally {
    cb && cb();
  }
};

const start = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const temp = Math.round(Math.random());
      if (temp > 0.5) {
        resolve(temp);
      } else {
        reject(temp);
      }
    }, 2000);
  });
};

start()
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  })
  .myFinally(() => {
    console.log("finally");
  });
