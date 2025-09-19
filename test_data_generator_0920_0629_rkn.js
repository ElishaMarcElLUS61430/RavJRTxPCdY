// 代码生成时间: 2025-09-20 06:29:36
import EmberObject from '@ember/object';
import { set } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { guidFor } from '@ember/object/internals';

/**
 * A utility class to generate test data.
 * @class TestDataGenerator
 */
export default class TestDataGenerator extends EmberObject {
  
  /**
   * Generates a random string of a specified length.
   * @method generateRandomString
   * @param {number} length - The length of the string to generate.
   * @returns {string} - A random string.
   */
  generateRandomString(length = 10) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generates a random integer within a specified range.
   * @method generateRandomInteger
   * @param {number} min - The minimum value of the range.
   * @param {number} max - The maximum value of the range.
   * @returns {number} - A random integer.
   */
  generateRandomInteger(min = 1, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generates a random boolean value.
   * @method generateRandomBoolean
   * @returns {boolean} - A random boolean value.
   */
  generateRandomBoolean() {
    return Math.random() >= 0.5;
  }

  /**
   * Generates a random date within a specified range.
   * @method generateRandomDate
   * @param {Date} startDate - The start date of the range.
   * @param {Date} endDate - The end date of the range.
   * @returns {Date} - A random date.
   */
  generateRandomDate(startDate, endDate) {
    if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
      throw new Error('Invalid date format');
    }
    if (endDate < startDate) {
      throw new Error('End date must be greater than start date');
    }
    const timeDiff = endDate.getTime() - startDate.getTime();
    const randomTime = Math.random() * timeDiff;
    return new Date(startDate.getTime() + randomTime);
  }

  /**
   * Generates a random object with specified properties.
   * @method generateRandomObject
   * @param {Object} properties - The properties to include in the object.
   * @returns {Object} - A random object.
   */
  generateRandomObject(properties) {
    if (isEmpty(properties)) {
      throw new Error('Properties must be provided');
    }
    const obj = {};
    Object.keys(properties).forEach(key => {
      const type = properties[key];
      switch (type) {
        case 'string':
          set(obj, key, this.generateRandomString());
          break;
        case 'integer':
          set(obj, key, this.generateRandomInteger());
          break;
        case 'boolean':
          set(obj, key, this.generateRandomBoolean());
          break;
        case 'date':
          set(obj, key, this.generateRandomDate(new Date(0), new Date()));
          break;
        default:
          throw new Error(`Unsupported property type: ${type}`);
      }
    });
    return obj;
  }

  /**
   * Generates an array of random objects.
   * @method generateRandomArray
   * @param {number} size - The size of the array.
   * @param {Object} properties - The properties to include in each object.
   * @returns {Array} - An array of random objects.
   */
  generateRandomArray(size, properties) {
    if (size <= 0) {
      throw new Error('Size must be greater than 0');
    }
    if (isEmpty(properties)) {
      throw new Error('Properties must be provided');
    }
    const array = [];
    for (let i = 0; i < size; i++) {
      array.push(this.generateRandomObject(properties));
    }
    return array;
  }
}
