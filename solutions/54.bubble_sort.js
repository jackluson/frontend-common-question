let arr = [10, 80, 40, 60, 30, 90, 40, 50, 85];

const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
};

const bubbleSortPlus = (arr) => {
  let second_max_pos = 0; // 存储每次遍历的第二大数索引
  for (let i = 0; i < arr.length - 1; i++) {
    let j = second_max_pos; // 从每次遍历之后的第二大数的索引开始遍历
    second_max_pos = 0; // 每次第二层遍历开始前重置
    for (j; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        if (arr[j] > arr[second_max_pos]) {
          second_max_pos = j;
        }
      }
    }
  }
};

bubbleSortPlus(arr);

console.log(arr);
