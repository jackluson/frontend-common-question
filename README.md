# frontend-common-question

> 本仓库是[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question) 的问题回答
### 第 182 题：实现一个异步求和函数

提供一个异步 add 方法如下，需要实现一个 await sum(...args) 函数：

```javascript
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}
```

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:
>
> 1. 利用 reduce，且 reduce 的初始值为 Promise.resolve()
> 2. await pre

```javascript
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}

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
```

</details>

<hr>

### 第 181 题：Promise.prototype.finally 的作用，如何自己实现 Promise.prototype.finally

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip: Promise.prototype.myFinally 函数的 this，就是当前实例

```javascript
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
```

</details>

<hr>

### 第 180 题：Promise.any 的作用，如何自己实现 Promise.any

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip: Promise.any 是构造函数上面的方法，any 的用法是：多个 promise 传进来，遇到一个成功就返回，全部失败的话，才执行 reject

```javascript
Promise.myAny = function (alls) {
  return new Promise(async (resolve, reject) => {
    const errInfo = {
      name: "All promises were rejected",
      message: "AggregateError",
      errors: [],
    };
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
```

</details>

<hr>

### 第 175 题：实现颜色转换 'rgb(255, 255, 255)' -> '#FFFFFF' 的多种思路

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip: 1. 利用 replace， 拼接$1, $2, $3, 2. 先提炼 rgb 到数组，然后拼接

```javascript
function rgb2hex(str) {
  const reg = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  return str.replace(reg, (_, $1, $2, $3) => {
    const firstByte = parseInt($1).toString(16).padStart(2, 0).toUpperCase();
    const secondByte = parseInt($2).toString(16).padStart(2, 0).toUpperCase();
    const thridByte = parseInt($3).toString(16).padStart(2, 0).toUpperCase();
    return `#${firstByte}${secondByte}${thridByte}`;
  });
}

function rgb2hexV2(str) {
  // const reg = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  const matchRes = str.match(/\d+/g);
  console.log("matchRes", matchRes);
  return matchRes.reduce(
    (pre, cur) => pre + parseInt(cur).toString(16).padStart(2, 0).toUpperCase(),
    "#"
  );
}
```

</details>

<hr>

### 第 172 题： JS 异步笔试题，请写出下面代码的运行结果（哔哩哔哩）

```javascript
var date = new Date();

console.log(1, new Date() - date);

setTimeout(() => {
  console.log(2, new Date() - date);
}, 500);

Promise.resolve().then(console.log(3, new Date() - date));

while (new Date() - date < 1000) {}

console.log(4, new Date() - date);
```

<details>
  <summary>
  解析如下:seedling: ：
  </summary>
注：首先then函数的参数如何不是函数的话，立即执行

1，3，4，2

</details>

<hr>

### 第 162 题：实现对象的 Map 函数类似 Array.prototype.map

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip: fn 不需要用 call 改变 this

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

### 第 161 题：用最精炼的代码实现数组非零非负最小值 index

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

### 第 160 题：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法

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

<hr>

### 第 159 题：实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:
>
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

### 第 158 题：如何模拟实现 Array.prototype.splice

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip: splice 改变原数组，返回删除数组，第一第二参数判断

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

<hr>

### 第 157 题：浏览器缓存 ETag 里的值是怎么生成的

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

Etag 一般是 ASCII 字符串组成，可以理解为文件的唯一标识，指纹。没有特定生成 Etag 的方法， 一般来说不同 Web 服务器生成 ETag 的方式不一样，经常用文件内容 hash，last-modified，或者甚至是版本号。

Etag 分类两种：

1. 强验证，如果前缀不是“W/”，则是强验证的，强验证是利用文件字节（ byte to byte）验证的，是严格的，但是通常是消耗性能的。
2. 弱验证，利用文件信息（比如日期）等生成的，

具体参考：

ETag：[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag)

HTTP 条件请求: [https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Conditional_requests](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Conditional_requests)

</details>

<hr>

### 第 156 题：求最终 left、right 的宽度 (flex-grow)

<details>
  <summary>
  实例代码如下：
  </summary>

```html
<div class="container">
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 300px;
    background: red;
  }
  .right {
    flex: 2 1 200px;
    background: blue;
  }
</style>
```

</details>
<details>
  <summary>
  解析如下:seedling: ：
  </summary>

flex 是 flex-grow、flex-shrink、flex-basis 的简称
flex-grow 默认值为：0

> 详情参考：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

当有剩余空间时，按照 flex-grow 系数比例，分配剩余的空间
剩余的空间：600 - (300 + 200) = 100。
子元素的 flex-grow 的值分别为 1，2， 剩余空间用 3 等分来分

> per = 100 / 3 = 33.3333333

> left = 300 + 1 \* 33.33 = 333.33

> right = 200 + 2 \* 33.33 = 266.67

线上 demo 可以看：[https://replit.com/@jackluson/flex-grow#index.html](https://replit.com/@jackluson/flex-grow#index.html)

</details>

<hr>

### 第 155 题：求最终 left、right 的宽度 (flex-shrink)

<details>
  <summary>
  实例代码如下：
  </summary>

```html
<div class="container">
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
  * {
    padding: 0;
    margin: 0;
  }
  .container {
    width: 600px;
    height: 300px;
    display: flex;
  }
  .left {
    flex: 1 2 500px;
    background: red;
  }
  .right {
    flex: 2 1 400px;
    background: blue;
  }
</style>
```

</details>
<details>
  <summary>
  解析如下:seedling: ：
  </summary>

flex 是 flex-grow、flex-shrink、flex-basis 的简称
flex-grow 默认值为：0
详情参考：[https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex)

当有剩余空间时，按照 flex-grow 系数比例，分配剩余的空间
剩余的空间：600 - (300 + 200) = 100。
子元素的 flex-grow 的值分别为 1，2， 剩余空间用 3 等分来分

> per = (500+400-600) / (2 \* 500 + 1 \* 400) = 0.214285714

> left = 500 - 0.214285714 \* 2 \* 500 = 285.714286

> right = 400 - 0.214285714 \* 1 \* 400 = 314.2857144

线上 demo 可以看：[https://replit.com/@jackluson/flex-grow#index.html](https://replit.com/@jackluson/flex-grow#index.html)

</details>

<hr>

### 第 154 题：弹性盒子中 flex: 0 1 auto 表示什么意思

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> flex 是 flxe-grow、flex-shrink、flex-basis 缩写形式

> flex-grow：指的是定义了如果宽度有剩余时，如何分配宽度，默认值是 0

> flex-shrink：指的是定义了如果宽度不足时，如何分配宽度，默认值是 1

> flex-basis: 指的是盒子初始宽度，默认值是 auto，如果不设置的话，默认就是盒子原始宽度

</details>

<hr>

### 第 153 题：实现一个批量请求函数 multiRequest(urls, maxNum)

要求如下：

1. 要求最大并发数 maxNum
2. 每当有一个请求返回，就留下一个空位，可以增加新的请求
3. 所有请求完成后，结果按照 urls 里面的顺序依次打出

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:
>
> 1. 创建一个 promise， 赋值 resolve

```javascript
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
  while (i < maxNum) {
    specialRequest();
  }
  return promise.then(() => Promise.all(taskList));
}

const urls = [1, 2, 3, 4, 5, 6];
multiRequest(urls, 4).then((res) => {
  console.log("res", res);
});
```

</details>

<hr>

### 第 152 题：实现一个 normalize 函数，能将输入的特定的字符串转化为特定的结构化数据, 字符串仅由小写字母和 [] 组成，且字符串不会包含多余的空格。

1. 示例一: 'abc' --> {value: 'abc'}
2. 示例二：'[abc[bcd[def]]]' --> {value: 'abc', children: {value: 'bcd', children: {value: 'def'}}}

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:
>
> 1. split 切割成数组
> 2. 利用 reduce，对象引用类型

```javascript
function normalize(str) {
  let result = {};
  return str
    .split(/[\[\]]+/)
    .filter(Boolean)
    .reduce((pre, cur, index, arr) => {
      pre.value = cur;
      if (arr.length - 1 === index) {
        return result;
      } else {
        pre.children = {};
        return pre.children;
      }
    }, result);
}
const str = "[abc[bcd[def][hf]]]";
const res = normalize(str);
```

</details>

<hr>

### 第 151 题：用最简洁代码实现 indexOf 方法

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> Tip:
>
> 1. 注意 indexOf 第二个参数

```javascript
Array.prototype._indexOf = (val,start=0)
  const _self = this;
  let indexResult = -1;
  for(let i = start; i <= _self.length; i++){
    const item = _self[i]
    if(item === val) return i;
  }
  return indexResult;
}
const res = [1, 2, 3, 4]._indexOf(23);
console.log(res);
```

</details>

<hr>

### 第 150 题：二分查找如何定位左边界和右边界

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

```javascript
var search = function (nums, target, isBorder) {
  let min = 0;
  let max = nums.length - 1;
  let isRightBorder = false;
  let isLeftBorder = false;
  if (isBorder === "left") {
    isLeftBorder = true;
  } else if (isBorder === "right") {
    isRightBorder = true;
  }
  while (min <= max) {
    let mid = Math.ceil((max + min) / 2);
    let cur = nums[mid];
    if (cur === target) {
      if (isLeftBorder) {
        mid = mid - 1;
        if (nums[mid] !== target) {
          return mid + 1;
        }
        max = mid;
      } else if (isRightBorder) {
        mid = mid + 1;
        if (nums[mid] !== target) {
          return mid - 1;
        }
        min = mid;
      } else {
        return mid;
      }
    } else if (target > cur) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let minIndex = search(nums, target, "left");
  let maxIndex = search(nums, target, "right");

  return [minIndex, maxIndex];
};

console.log(searchRange([5, 7, 7, 8, 8, 10], 8));
```

</details>

<hr>

### 第 14 题：情人节福利题，如何实现一个 new

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> 1. 创建一个空的对象，空对象的**proto**属性指向构造函数的原型对象
> 2. 把上面创建的空对象赋值构造函数内部的 this，用构造函数内部的方法修改空对象
> 3. 如果构造函数返回一个非基本类型的值，则返回这个值，否则上面创建的对象

```javascript
function _new(fn, ...args) {
  console.log("args", args);
  const obj = Object.create(Object.prototype); // Object.setPrototypeof(obj, Object.prototype)
  const res = fn.apply(obj, args);
  console.log("res", res);
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  console.log("name", name);
  console.log("age", age);
  this.name = name;
  this.age = age;
}

const obj = _new(Person, "jack", 18);
console.log("obj", obj);
```

</details>

<hr>

### 第 5 题：介绍下深度优先遍历和广度优先遍历，如何实现？

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

> :notebook: 深度遍历 -- 从一个顶点 v 出发，访问 v 没有被访问过的邻接点，然后再依次以没有被访问过的邻接点出发进行深度优先遍历

> 广度优先 -- 从顶点 v 出发，访问 v 相邻的节点，遍历完之后，再遍历其相邻节点的相邻节点

```javascript
function dfs(root, nodes = []) {
  if (root) {
    nodes.push(root);
    if (root.children) {
      for (let index = 0; index < root.children.length; index++) {
        dfs(root.children[index], nodes);
      }
    }
  }
  return nodes;
}
function bfs(root) {
  let nodes = [],
    queue = [];
  if (root) {
    queue.push(root);
  }
  while (queue.length) {
    const curNode = queue.shift();
    nodes.push(curNode);
    if (curNode.children) {
      for (let index = 0; index < curNode.children.length; index++) {
        queue.push(curNode.children[index]);
      }
    }
  }
  return nodes;
}
```

</details>

<hr>

<h3>第 3 题：什么是防抖和节流？有什么区别？如何实现
</h3>

<details>
  <summary>
  解析如下:seedling: ：
  </summary>

>

```javascript
// 防抖指的是在这段时间内只会发生一次，如果在这段时间内再次触发，则会重新开始计算时间, 实现如下：
function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// 节流指的是按多少时间去执行一次

function throttle(fn, delay) {
  let canRun = true;
  return function (...args) {
    if (!canRun) return;
    canRun = false;
    setTimeout(() => {
      fn.apply(this, args);
      canRun = true;
    }, delay);
  };
}
```

</details>
