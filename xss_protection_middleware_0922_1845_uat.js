// 代码生成时间: 2025-09-22 18:45:07
import Route from '@ember/routing/route';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

// Middleware to sanitize input to prevent XSS attacks
export default class XssProtectionRoute extends Route {
  @service('xss-protection') xssProtection;

  constructor() {
    super(...arguments);
  }

  // Hook that runs before model is fetched
  beforeModel() {
    super.beforeModel(...arguments);
    this.sanitizeRequestParams();
  }

  // Action to handle requests
  @action
  handleRequest(params) {
    try {
      // Sanitize parameters to prevent XSS
      const sanitizedParams = this.xssProtection.sanitize(params);
      // Continue with the logic using sanitized parameters
      // ...
      return this.route(sanitizedParams);
    } catch (error) {
      // Handle errors related to sanitizing input
      console.error('XSS protection failed:', error);
      return this.transitionTo('error');
    }
  }

  // Sanitize request parameters to prevent XSS
  sanitizeRequestParams() {
    const params = this.paramsFor(this.routeName);
    if (!isEmpty(params)) {
      this.replaceWith(this.routeName, this.xssProtection.sanitize(params));
    }
  }
}

// Service to handle XSS protection
import Service from '@ember/service';
import { isEmpty } from '@ember/utils';
import { htmlSafe } from '@ember/string';

export default class XssProtectionService extends Service {
  // Method to sanitize input data
  sanitize(input) {
    if (isEmpty(input)) {
      return input;
    }
    // Implement your sanitization logic here.
    // For example, using a library like DOMPurify to sanitize HTML content.
    const sanitizedInput = this.sanitizeHtml(input);
    return sanitizedInput;
  }

  // Example sanitizeHtml method using DOMPurify
  sanitizeHtml(html) {
    // Import DOMPurify
    const DOMPurify = require('dompurify')(window);

    // Sanitize HTML content using DOMPurify
    return htmlSafe(DOMPurify.sanitize(html));
  }
}
