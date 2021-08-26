
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

const b = [1, 2, 3, 4];
const results = b._map(function (val, index, arr) {
  return val + index;
});

console.log("results", results);