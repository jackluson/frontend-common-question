# frontend-common-question

> 本仓库是[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question) 的问题回答

<h3>第 162 题：实现对象的 Map 函数类似 Array.prototype.map</h3>

<details>
  <summary>
  解析如下：
  </summary>

  >tip: :seedling: fn不需要用call改变this

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

例如：[10,21,0,-7,35,7,9,23,18] 输出5, 7最小

```javascript
function getIndex(arr){
  let index=null;
  ...
  return index;
}
```

<details>
  <summary>
  解析如下：
  </summary>

  > tip: :seedling: reduce实现

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
