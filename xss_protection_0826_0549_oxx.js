// 代码生成时间: 2025-08-26 05:49:18
// XSS Protection Service using Ember
// This service provides basic XSS protection by sanitizing user input.

import Ember from 'ember';
import { escapeHTML } from 'ember-string-utils';

export default Ember.Service.extend({
  // This method sanitizes the input string to prevent XSS attacks.
  // It escapes any HTML characters to ensure they are not interpreted as HTML code.
  sanitizeInput(input) {
    try {
      // Check if input is a string
      if (typeof input !== 'string') {
        throw new Error('Input must be a string');
      }

      // Escape HTML characters to prevent XSS
      const sanitizedInput = escapeHTML(input);

      // Return the sanitized string
      return sanitizedInput;
    } catch (error) {
      // Handle any errors that occur during sanitization
      console.error('An error occurred while sanitizing input:', error.message);
      return null;
    }
  }
});
