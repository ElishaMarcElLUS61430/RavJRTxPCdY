// 代码生成时间: 2025-08-02 10:34:58
import Ember from 'ember';

// APIResponseFormatter is a utility service for formatting API responses.
// It takes in API response data and formats it according to predefined rules.
export default Ember.Service.extend({

  // Format a JSON API response
  formatResponse(data) {
    try {
      // Check if the data is null or undefined
      if (!data) {
        throw new Error('No data provided');
      }

      // Validate the JSON structure (if needed) and format it
      // For example, assuming a structure with 'data' and 'errors'
      if (data.data && data.errors) {
        return {
          success: data.data,
          errors: data.errors
        };
      } else if (data.errors) {
        // Handle the case where there are errors but no data
        throw new Error('API response contains errors: ' + JSON.stringify(data.errors));
      } else {
        // Default case, return the data as is
        return data;
      }
    } catch (error) {
      // Log the error and re-throw it to be handled by the caller
      console.error('Error formatting API response:', error);
      throw error;
    }
  },

  // Additional methods can be added here to handle different types of API responses
  // or to add more complex formatting rules

  // Example:
  // formatErrorResponse(error) {
  //   // Implement error response formatting logic here
  // },

  // Example:
  // formatListResponse(data) {
  //   // Implement list response formatting logic here
  // },

  // Example:
  // formatDetailedResponse(data) {
  //   // Implement detailed response formatting logic here
  // },

  // ...

  // Metadata about the service, such as its version, can be added here
  version: '1.0.0',

  // Any additional configuration or metadata can be stored here
  config: {
    // Example configuration:
    // defaultFormat: 'json',
    // ...
  }

});