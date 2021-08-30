function foo(...args) {
  let addArgs = [...args];
  function fn(...innerArgs) {
    addArgs = [...addArgs, ...innerArgs];
    return fn;
  }
  fn.getValue = function () {
    return addArgs.reduce((pre, cur) => {
      return pre + cur;
    }, 0);
  };
  return fn;
}

const sum = foo(1, 2, 3)(2)(3).getValue();
// const sum = foo(1, 2, 3).getValue();
console.log("sum", sum);
