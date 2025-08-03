// 代码生成时间: 2025-08-04 00:42:58
 * @description A simple tool to calculate hash values for strings.
 * @author Your Name
 * @version 1.0
 */

import Ember from 'ember';

export default Ember.Component.extend({
  // The input string for which to calculate the hash
  inputString: '',

  // The computed hash value
  hashedValue: Ember.computed('inputString', function() {
    const input = this.get('inputString');
    if (!input) {
      return '';
    }
    return this.calculateHash(input);
  }),

  // Method to calculate hash
  calculateHash(input) {
    try {
      // Use CryptoJS library for hashing
      const hash = CryptoJS.SHA256(input);
      return hash.toString();
    } catch (error) {
      console.error('Error calculating hash:', error);
      return '';
    }
  },

  // Actions
  actions: {
    calculateHashAction() {
      const hashedValue = this.get('hashedValue');
      if (hashedValue) {
        alert('Hashed Value: ' + hashedValue); // Show the hashed value in an alert
      } else {
        alert('Please enter an input string to calculate the hash.');
      }
    }
  },

  // Lifecycle hooks
  init() {
    this._super(...arguments);
    // Perform any initialization here
  }
});