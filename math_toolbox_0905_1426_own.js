// 代码生成时间: 2025-09-05 14:26:30
// Import Ember framework components
import EmberObject, { computed } from '@ember/object';
import { action } from '@ember/object';

export default class MathToolbox extends EmberObject {
  // State properties for storing the inputs and results
  num1 = '';
  num2 = '';
  result = '';
  errorMessage = '';

  // Computed properties for validating the inputs
  isNum1Valid = computed('num1', function() {
    return !isNaN(this.num1) && this.num1 !== '';
  });

  isNum2Valid = computed('num2', function() {
    return !isNaN(this.num2) && this.num2 !== '';
  });

  // Action for performing addition
  @action
  async add() {
    try {
      if (this.isNum1Valid && this.isNum2Valid) {
        this.result = parseFloat(this.num1) + parseFloat(this.num2);
        this.errorMessage = '';
      } else {
        throw new Error('Both numbers must be valid integers or decimals.');
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Action for performing subtraction
  @action
  async subtract() {
    try {
      if (this.isNum1Valid && this.isNum2Valid) {
        this.result = parseFloat(this.num1) - parseFloat(this.num2);
        this.errorMessage = '';
      } else {
        throw new Error('Both numbers must be valid integers or decimals.');
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Action for performing multiplication
  @action
  async multiply() {
    try {
      if (this.isNum1Valid && this.isNum2Valid) {
        this.result = parseFloat(this.num1) * parseFloat(this.num2);
        this.errorMessage = '';
      } else {
        throw new Error('Both numbers must be valid integers or decimals.');
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Action for performing division
  @action
  async divide() {
    try {
      if (this.isNum1Valid && this.isNum2Valid) {
        if (this.num2 === '0') {
          throw new Error('Cannot divide by zero.');
        }
        this.result = parseFloat(this.num1) / parseFloat(this.num2);
        this.errorMessage = '';
      } else {
        throw new Error('Both numbers must be valid integers or decimals.');
      }
    } catch (error) {
      this.errorMessage = error.message;
    }
  }
}
