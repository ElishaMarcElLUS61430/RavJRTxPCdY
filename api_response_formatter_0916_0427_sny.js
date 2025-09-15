// 代码生成时间: 2025-09-16 04:27:09
import Ember from 'ember';

// Define the ApiResponseFormatter component
export default Ember.Component.extend({
  // The API response to be formatted
  apiResponse: null,

  // Error message to display if the API response is invalid or null
  errorMessage: '',

  // Initialize the component
  init() {
    this._super(...arguments);
    if (!this.get('apiResponse')) {
      this.set('errorMessage', 'No API response provided.');
    }
  },

  // Actions to be taken when the component is inserted into the DOM
  didInsertElement() {
    this._super(...arguments);
    this.formatResponse();
  },

  // Method to format the API response
  formatResponse() {
    try {
      // Check if the API response is valid
      if (!this.get('apiResponse') || typeof this.get('apiResponse') !== 'object') {
        throw new Error('Invalid API response.');
      }

      // Format the API response as desired
      // For example, convert it to a JSON string with indentation for readability
      const formattedResponse = JSON.stringify(this.get('apiResponse'), null, 2);
      this.set('apiResponse', formattedResponse);
    } catch (error) {
      // Set an error message if the formatting fails
      this.set('errorMessage', error.message);
    }
  },

  // Actions to be used within the component's template
  actions: {
    // Action to handle the API response update
    updateApiResponse(newResponse) {
      this.set('apiResponse', newResponse);
      this.set('errorMessage', '');
      this.formatResponse();
    }
  }
});