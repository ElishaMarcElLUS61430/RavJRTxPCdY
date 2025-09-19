// 代码生成时间: 2025-09-19 10:51:37
import Ember from 'ember';

// Ember service that encapsulates the sorting algorithm
export default Ember.Service.extend({

  // Method to sort an array of numbers using the bubble sort algorithm
  bubbleSort(numbers) {
    // Error handling: Check if the input is an array
    if (!Array.isArray(numbers)) {
      throw new Error('Input must be an array.');
    }
    
    // Error handling: Check if all elements in the array are numbers
    if (!numbers.every(element => typeof element === 'number')) {
      throw new Error('All elements in the array must be numbers.');
    }

    let length = numbers.length;
    for (let i = 0; i < length - 1; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (numbers[j] > numbers[j + 1]) {
          // Swap the elements
          let temp = numbers[j];
          numbers[j] = numbers[j + 1];
          numbers[j + 1] = temp;
        }
      }
    }
    return numbers;
  },

  // Method to sort an array of objects based on a given property using selection sort algorithm
  selectionSortByProperty(array, property) {
    // Error handling: Check if the input is an array
    if (!Array.isArray(array)) {
      throw new Error('Input must be an array.');
    }
    
    // Error handling: Check if the property exists on each element of the array
    array.forEach(element => {
      if (!element.hasOwnProperty(property)) {
        throw new Error(`Property '${property}' does not exist on array elements.');
      }
    });

    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        if (array[j][property] < array[minIndex][property]) {
          minIndex = j;
        }
      }
      // Swap the elements if the minimum element is not in the correct position
      if (minIndex !== i) {
        let temp = array[i];
        array[i] = array[minIndex];
        array[minIndex] = temp;
      }
    }
    return array;
  }

  // Additional sorting algorithms can be added here in a similar manner
  // ...
});

// This service can be injected into Ember components or routes as needed to perform sorting operations.