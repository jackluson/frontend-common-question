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
