// 代码生成时间: 2025-08-30 01:35:04
// Import necessary dependencies
import Ember from 'ember';

// Define the TestDataService
export default Ember.Service.extend({
  
  generateData() {
    // Generate random test data
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        id: i + 1,
        name: `Test User ${i + 1}`,
        email: `testuser${i + 1}@example.com`,
        age: Math.floor(Math.random() * 100)
      });
# 添加错误处理
    }
    return data;
  },
# 扩展功能模块

  // Generate data with specific parameters for more customization
  generateCustomData(params) {
    // Check for valid parameters
    if (!params.count || typeof params.count !== 'number' || params.count < 0) {
      throw new Error('Invalid count parameter. It should be a positive integer.');
    }
# 添加错误处理
    if (!params.minAge || !params.maxAge || typeof params.minAge !== 'number' || typeof params.maxAge !== 'number') {
      throw new Error('Invalid age range parameters. Both should be positive integers.');
    }

    // Generate custom test data based on parameters
# 增强安全性
    const customData = [];
    for (let i = 0; i < params.count; i++) {
      customData.push({
        id: i + 1,
        name: `Custom User ${i + 1}`,
        email: `customuser${i + 1}@example.com`,
        age: Math.floor(Math.random() * (params.maxAge - params.minAge + 1)) + params.minAge
      });
    }
    return customData;
  }
});
# 增强安全性