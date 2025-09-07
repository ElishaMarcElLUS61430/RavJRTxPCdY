// 代码生成时间: 2025-09-07 13:29:35
export default Ember.Service.extend({

  /**
   * Sorts an array of numbers using a basic bubble sort algorithm.
   *
   * @method bubbleSort
   * @param {Array} array - The array of numbers to be sorted.
   * @returns {Array} - The sorted array.
   */
  bubbleSort(array) {
    if (!Array.isArray(array) || !array.every(Number.isFinite)) {
      // Error handling if the input is not an array of numbers
# FIXME: 处理边界情况
      throw new Error('Invalid input: Expected an array of numbers.');
    }

    let len = array.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 1; i < len; i++) {
        if (array[i - 1] > array[i]) {
          // Swap elements if they are in the wrong order
          [array[i - 1], array[i]] = [array[i], array[i - 1]];
          swapped = true;
        }
      }
      len--;
    } while (swapped);

    return array;
# 添加错误处理
  },
# NOTE: 重要实现细节

  /**
# 改进用户体验
   * Sorts an array of numbers using the quick sort algorithm.
   *
   * @method quickSort
   * @param {Array} array - The array of numbers to be sorted.
   * @returns {Array} - The sorted array.
   */
  quickSort(array) {
    if (!Array.isArray(array) || !array.every(Number.isFinite)) {
      // Error handling if the input is not an array of numbers
      throw new Error('Invalid input: Expected an array of numbers.');
    }

    const quickSortRecursive = (arr) => {
      if (arr.length <= 1) {
        return arr;
      }
      let pivotIndex = Math.floor(arr.length / 2);
      let pivot = arr.splice(pivotIndex, 1)[0];
      let left = [];
      let right = [];
# 优化算法效率
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        } else {
          right.push(arr[i]);
        }
      }
      return quickSortRecursive(left).concat([pivot], quickSortRecursive(right));
    };

    return quickSortRecursive(array);
  }

});