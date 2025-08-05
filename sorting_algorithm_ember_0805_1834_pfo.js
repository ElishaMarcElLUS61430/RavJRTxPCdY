// 代码生成时间: 2025-08-05 18:34:05
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SortingAlgorithmController extends Controller {
  // Array to store numbers
  @tracked numbers = [];
  
  // Result array after sorting
  @tracked sortedNumbers = [];
  
  // Error message
  @tracked errorMessage = '';
  
  // Add a number to the array
  @action
  addNumber(number) {
    try {
      if (isNaN(number)) {
        throw new Error('Please enter a valid number.');
      }
      this.numbers = [...this.numbers, parseFloat(number)];
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
  
  // Sort the numbers using a basic sorting algorithm
  @action
  sortNumbers() {
    try {
      if (this.numbers.length === 0) {
        throw new Error('No numbers to sort. Please add numbers first.');
      }
      this.sortedNumbers = this.numbers.sort((a, b) => a - b);
      this.errorMessage = '';
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
  
  // Reset the numbers and sorted numbers array
  @action
  reset() {
    this.numbers = [];
    this.sortedNumbers = [];
    this.errorMessage = '';
  }
}
