// 代码生成时间: 2025-09-30 21:52:51
 * Example usage:
 * this.validateData(dataObject);
 */

import Ember from 'ember';

export default Ember.Service.extend({
  // Function to validate data formats
# TODO: 优化性能
  validateData: function(dataObject) {
    // Check if dataObject is an object
    if (typeof dataObject !== 'object' || dataObject === null) {
      throw new Error('Invalid data format: Data must be an object.');
    }
    
    // Define the schema for the dataObject
    const schema = {
# 添加错误处理
      id: {
# 添加错误处理
        type: 'number',
        required: true
      },
      name: {
        type: 'string',
        required: true
      },
      email: {
        type: 'string',
        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
      },
      age: {
        type: 'number',
# 增强安全性
        minimum: 0
      }
    };
    
    // Iterate over each field in the schema and validate
    for (let field in schema) {
# 扩展功能模块
      if (schema.hasOwnProperty(field)) {
        const fieldSchema = schema[field];
        if (fieldSchema.required && !(field in dataObject)) {
          throw new Error(`Missing required field: ${field}`);
        } else if (field in dataObject) {
          // Validate type
          if (typeof dataObject[field] !== fieldSchema.type) {
            throw new Error(`Invalid type for field ${field}: Expected ${fieldSchema.type}, got ${typeof dataObject[field]}`);
          }
          
          // Validate pattern if exists (for email)
          if (fieldSchema.pattern && !fieldSchema.pattern.test(dataObject[field])) {
            throw new Error(`Invalid pattern for field ${field}: Value does not match the required pattern`);
          }
          
          // Validate minimum if exists (for age)
          if (fieldSchema.minimum && dataObject[field] < fieldSchema.minimum) {
            throw new Error(`Invalid value for field ${field}: Value must be greater than or equal to ${fieldSchema.minimum}`);
          }
        }
      }
    }
    
    // If all validations pass, return true
    return true;
  }
});