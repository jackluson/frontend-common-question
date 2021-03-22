# frontend-common-question

> 本仓库是[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question) 的问题回答

<h3>第 162 题：实现对象的 Map 函数类似 Array.prototype.map</h3>

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:fn 不需要用 call 改变 this

```javascript
Array.prototype._map = function (fn) {
  const _self = this;
  const results = [];
  for (let index = 0; index < _self.length; index++) {
    const item = _self[index];
    const res = fn(item, index, _self);
    results.push(res);
  }
  return results;
};

const results = b._map((val, index, arr) => {
  return val + index;
});
console.log("results", results);
```

</details>

<hr>
<h3>第 161 题：用最精炼的代码实现数组非零非负最小值index</h3>

例如：[10,21,0,-7,35,7,9,23,18] 输出 5, 7 最小

```javascript
function getIndex(arr){
  let index=null;
  ...
  return index;
}
```

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:reduce 实现

```javascript
function findMininumIndex_v2(arr) {
  let minIndex = -1;
  return arr.reduce((pre, cur, index) => {
    minIndex =
      cur > 0 && ((pre > 0 && pre > cur) || pre <= 0) ? index : minIndex; // 基于cur > 0情况
    const min = cur > 0 && ((pre > 0 && pre > cur) || pre <= 0) ? cur : pre;
    return index === arr.length - 1 ? minIndex : min;
  }, arr[0]);
}
```

</details>

<hr>
<h3>第 160 题：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法</h3>
<details>
  <summary>
  实例代码如下：
  </summary>

```javascript
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.forEach(async (x) => {
    const res = await square(x);
    console.log(res);
  });
}
test();
```

</details>

<details>
  <summary>
  解析如下:seedling: ：
  </summary>
  
> :notebook: 因为forEach的内部实现原因，forEach本身是不阻塞的（没有返回promise），而forEach的回调是并行执行的，不需要依赖其他回调执行结束在执行

> Tip: reduce 实现 或者 for 遍历

```javascript
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 3000);
  });
};
// 解法一：
async function test() {
  await list.reduce((_, x) => {
    return _.then(() => {
      return square(x);
    }).then(console.log);
  }, Promise.resolve());
}

// 解法二：
async function test_v2() {
  for (const x of list) {
    const res = await square(x);
    console.log(res);
  }
}
```

</details>

<hr>
<h3>第 159 题：实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject</h3>
<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> 1. 挂载在原型上，利用 async，await
> 2. 挂载在构造函数上，结合递归

```javascript
Promise.prototype.retry = function (fn, count) {
  return new Promise(async (resolve, reject) => {
    let errorInfo;
    for (let index = 0; index < count; index++) {
      try {
        const result = await fn(index);
        return resolve(result);
      } catch (error) {
        errorInfo = error;
      }
    }
    reject(errorInfo);
  });
};
// 解法二
Promise.retry_v2 = function (p, times) {
  return p()
    .then((res) => res)
    .catch((res) => {
      if (times > 1) {
        times--;
        return Promise.retry_v2(p, times);
      } else {
        return Promise.reject(res);
      }
    });
};

//用例测试
function getProm() {
  const n = Math.random();
  return new Promise((resolve, reject) => {
    setTimeout(() => (n > 0.9 ? resolve(n) : reject(n)), 1000);
  });
}
const p = new Promise((resolve, reject) => {
  resolve(2);
});

Promise.retry_v2(getProm, 3)
  .then((res) => {
    console.log("res1", res);
  })
  .catch((res) => {
    console.log("catch", res);
  });
```

</details>

<hr>
<h3>第 158 题：如何模拟实现 Array.prototype.splice</h3>
<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> 1. splice 改变原数组，返回删除数组，第一第二参数判断

```javascript
Array.prototype._splice = function (index, count, ...items) {
  let _self = this;
  const lenght = _self.length;
  // 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数，这意味着-n是倒数第n个元素并且等价于array.length-n）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。
  let start =
    index >= 0
      ? Math.min(index, lenght)
      : Math.abs(index) > lenght
      ? 0
      : lenght + index;
  let deleteCount = Math.max(0, count);
  if (count === undefined) {
    deleteCount = lenght - start;
  }
  let delArr = [];
  let temp = [];
  delArr = _self.slice(start, deleteCount + start);
  temp = [
    ..._self.slice(0, start),
    ...items,
    ..._self.slice(start + deleteCount),
  ];
  // 改变this
  temp.forEach(function (item, index) {
    _self[index] = item;
  });
  _self.length = temp.length; // 改变长度

  return delArr;
};
const a1 = a._splice(1);

console.log(a, a1);
```

</details>
