// 代码生成时间: 2025-09-19 03:35:06
import EmberObject from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// 创建一个数学计算工具集的Ember组件
export default class MathToolbox extends EmberObject {
  @tracked result = '';
  
  // 执行加法运算
  @action
  add(a, b) {
    try {
      this.result = a + b;
    } catch (error) {
      this.result = 'Error: Invalid input';
    }
  }

  // 执行减法运算
  @action
  subtract(a, b) {
    try {
      this.result = a - b;
    } catch (error) {
      this.result = 'Error: Invalid input';
    }
  }

  // 执行乘法运算
  @action
  multiply(a, b) {
    try {
      this.result = a * b;
    } catch (error) {
      this.result = 'Error: Invalid input';
    }
  }

  // 执行除法运算
  @action
  divide(a, b) {
    try {
      if (b === 0) {
        throw new Error('Division by zero');
      }
      this.result = a / b;
    } catch (error) {
      this.result = 'Error: ' + error.message;
    }
  }

  // 执行平方运算
  @action
  square(a) {
    try {
      this.result = a * a;
    } catch (error) {
      this.result = 'Error: Invalid input';
    }
  }

  // 执行平方根运算
  @action
  sqrt(a) {
    try {
      if (a < 0) {
        throw new Error('Cannot calculate square root of negative number');
      }
      this.result = Math.sqrt(a);
    } catch (error) {
      this.result = 'Error: ' + error.message;
    }
  }
}

// Usage:
// 1. Create an instance of the MathToolbox component
// const toolbox = new MathToolbox();

// 2. Use the action methods to perform calculations and get the result
// toolbox.add(5, 3);  // returns 8
// toolbox.subtract(10, 4);  // returns 6
// toolbox.multiply(2, 3);  // returns 6
// toolbox.divide(20, 4);  // returns 5
// toolbox.square(5);  // returns 25
// toolbox.sqrt(25);  // returns 5
