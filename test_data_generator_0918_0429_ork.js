// 代码生成时间: 2025-09-18 04:29:20
// Test Data Generator using JS and Ember Framework
// Filename: test_data_generator.js

// Import Ember modules
import Ember from 'ember';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import { observer } from '@ember/object/observers';

// Define TestDataGenerator service
export default Ember.Service.extend({
  // Store generated test data here
  testData: null,

  // Initialize test data
  init() {
    this._super(...arguments);
    this.set('testData', A([]));
  },

  // Generate a single test record
  generateTestRecord() {
    try {
      // Define a sample schema for the test record
      const schema = {
        id: Ember.guidFor(Ember.Object.create()),
        name: this._generateRandomName(),
        email: this._generateRandomEmail(),
        age: this._generateRandomAge()
      };
      // Add generated test record to the testData array
      this.get('testData').pushObject(schema);
    } catch (error) {
      // Handle any errors in data generation
      console.error('Error generating test record:', error);
    }
  },

  // Clear all test data
  clearTestData() {
    this.set('testData', A([]));
  },

  // Generate a set number of test records
  generateTestData(count) {
    if (typeof count !== 'number' || count < 1) {
      throw new Error('Invalid count value');
    }
    for (let i = 0; i < count; i++) {
      this.generateTestRecord();
    }
  },

  // Helper method to generate a random name
  _generateRandomName() {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie'];
    const lastNames = ['Doe', 'Smith', 'Johnson', 'Brown', 'Davis'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  },

  // Helper method to generate a random email
  _generateRandomEmail() {
    const domains = ['example.com', 'test.com', 'sample.net'];
    return `${Ember.guidFor(Ember.Object.create())}@${domains[Math.floor(Math.random() * domains.length)]}`;
  },

  // Helper method to generate a random age
  _generateRandomAge() {
    return Math.floor(Math.random() * 100) + 1; // Random age between 1 and 100
  }
});
