# frontend-common-question

> 本仓库是[Daily-Interview-Question](https://github.com/Advanced-Frontend/Daily-Interview-Question) 的问题回答

第 162 题：实现对象的 Map 函数类似 Array.prototype.map

<details>
  <summary>
  解析如下：
  </summary>

  ```javascript
  Array.prototype._map = function (fn) {
      const _self = this;
      const results = [];
      for (let index = 0; index < _self.length; index++) {
        const item = _self[index];
        const res = fn.call(_self, item, index, _self);
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



