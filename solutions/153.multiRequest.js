function request(url) {
  return new Promise((resolve, reject) => {
    const time = Math.random() * 1000;
    setTimeout(() => {
      resolve(url);
    }, time);
  });
}

function multiRequest(urls, maxNum) {
  let i = 0;
  const taskList = [];
  let resolve;
  const promise = new Promise((r) => (resolve = r)); // 关键点1
  const specialRequest = () => {
    if (i >= urls.length) {
      return resolve(); // 此时说明请求发送完毕,return 必不可少
    }
    const task = request(urls[i++]).finally(() => {
      specialRequest(); // 关键点2递归
    });
    taskList.push(task);
  };

  for (i; i < maxNum; i) {
    specialRequest();
  }

  // while (i < maxNum) {
  //   specialRequest();
  // }
  console.log("object");
  return promise.then(() => Promise.all(taskList));
}
const urls = [1, 2, 3, 4, 5, 64];
multiRequest(urls, 4).then((res) => {
  console.log("res", res);
});
