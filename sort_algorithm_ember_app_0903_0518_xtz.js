// 代码生成时间: 2025-09-03 05:18:53
 * Features:
 * - Bubble Sort implementation with error handling
 * - Code comments and documentation for clarity and maintainability
 * - Follows JavaScript best practices
 * - Ensures code maintainability and extensibility
 */

import Ember from 'ember';

// Define the SortService to encapsulate sorting logic
export default Ember.Service.extend({
  // Bubble Sort Algorithm
  bubbleSort(array) {
    // Check if input is an array
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array');
    }

    // Clone the array to avoid mutating the original array
    const sortedArray = [...array];
    let n = sortedArray.length;
    let swapped;
    do {
      swapped = false;
      for (let i = 1; i < n; i++) {
        if (sortedArray[i - 1] > sortedArray[i]) {
          // Swap elements if they are in the wrong order
          const temp = sortedArray[i - 1];
          sortedArray[i - 1] = sortedArray[i];
          sortedArray[i] = temp;
          swapped = true;
        }
      }
      // Reduce n by 1 after each pass since the last element is already sorted
      n--;
    } while (swapped);

    return sortedArray;
  },

  // Additional sorting algorithms can be added here
  // e.g., quickSort, mergeSort, etc.
});
