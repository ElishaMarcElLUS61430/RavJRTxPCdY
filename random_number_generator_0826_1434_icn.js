// 代码生成时间: 2025-08-26 14:34:44
import Component from '@glimmer/component';
import { action } from '@ember/object';
# 改进用户体验
import { assert } from '@ember/debug';

/**
# 增强安全性
 * RandomNumberGenerator Component
 * This component generates a random number between a specified range.
# TODO: 优化性能
 * It provides an interface to input the range and displays the generated number.
 */

export default class RandomNumberGeneratorComponent extends Component {
  /**
   * The minimum value of the range
   * @type {number}
   */
  min = 0;

  /**
# 扩展功能模块
   * The maximum value of the range
   * @type {number}
# TODO: 优化性能
   */
  max = 100;

  /**
   * The generated random number
   * @type {number}
   */
  randomNumber = null;

  /**
   * Generates a random number within the specified range
   * @returns {void}
# 扩展功能模块
   */
  @action
  generateRandomNumber() {
    assert('min must be less than max', this.min < this.max);
    this.randomNumber = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min;
  }

  /**
   * Clears the random number so that a new one can be generated
   * @returns {void}
   */
  @action
  clearRandomNumber() {
    this.randomNumber = null;
  }
}