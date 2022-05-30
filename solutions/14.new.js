function _new(fn, ...args) {
  const obj = Object.create(fn.prototype); // Object.setPrototypeof(obj, Object.prototype)
  // Object.setPrototypeOf(obj, fn.prototype);
  const res = fn.apply(obj, args);
  return res instanceof Object ? res : obj;
}

function Person(name, age) {
  console.log('name', name);
  console.log('age', age);
  this.name = name;
  this.age = age;
}

Person.prototype.getName = function () {
  return this.name;
};

const obj = _new(Person, 'jack', 18);
// const obj1 = new Person('jack', 18);
console.log('obj', obj);
console.log('name', obj.getName());
// console.log('name', obj1, obj1.getName());
