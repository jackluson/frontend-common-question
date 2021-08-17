const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

// function test() {
//   list.forEach(async (x) => {
//     const res = await square(x);
//     console.log(res);
//   });
// }

async function test() {
  await list.reduce((_, x) => {
    return _.then(() => {
      return square(x);
    }).then(console.log);
  }, Promise.resolve());
}

async function test_v2() {
  for (const x of list) {
    const res = await square(x);
    console.log(res);
  }
}
test_v2();
