## 什么是类型谓词

类似谓词 is 是类型收缩的其中一种

```typescript
class Car implements Vehicle {
  move = (distance: number) => {
    // Move car…
  };

  turnSteeringWheel = (direction: string) => {
    // Turn wheel…
  };
}
const anotherCar = 121;

if (isCar(anotherCar)) {
  anotherCar.turnSteeringWheel('left');
  console.log('这是一辆车');
} else {
  console.log('这不是一辆车');
}
```

## extends 和 implements 区别

### extends

1. 子类会继承父类的所有属性和方法
2. extends 如果单纯用在 ts 类型系统中, 起到`if`作用, 例如:

```ts
type DropChar<
  S extends string,
  C extends string
> = S extends `${infer F}${infer R}`
  ? F extends C
    ? DropChar<R, C>
    : `${F}${DropChar<R, C>}`
  : S;
```

### implements

implements 后面 接的是 interface 用于 约束某一个类必须用哪一些属性, 方法
