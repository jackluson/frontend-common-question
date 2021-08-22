/*
 * Desc:
 * File: /34.find-first-and-last-position-of-element-in-sorted-array.js
 * Project: binary-search
 * File Created: Sunday, 22nd August 2021 6:27:16 pm
 * Author: luxuemin2108@gmail.com
 * -----
 * Copyright (c) 2020 Camel Lu
 */
/* 

34. 在排序数组中查找元素的第一个和最后一个位置
给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

进阶：

你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？
 

示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]
 

提示：

0 <= nums.length <= 105
-109 <= nums[i] <= 109
nums 是一个非递减数组
-109 <= target <= 109
*/

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
