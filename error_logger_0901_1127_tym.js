// 代码生成时间: 2025-09-01 11:27:42
import Ember from 'ember';

export default Ember.Service.extend({
  // An array to store the error logs
  errorLogs: Ember.A(),

  /**
   * Logs an error message with a timestamp
   *
    * @param {string} errorMessage The error message to be logged
   * @param {Error|null} error An optional JavaScript Error object
   */
  logError(errorMessage, error = null) {
    try {
      const timestamp = new Date().toISOString();
      const log = {
        timestamp,
        message: errorMessage,
        error: error ? error.stack : null
      };
      this.get('errorLogs').pushObject(log);
    } catch (e) {
      console.error('Error logging failed:', e);
    }
  },

  /**
   * Clears all the error logs
   */
  clearLogs() {
    this.set('errorLogs', Ember.A());
  },

  /**
   * Retrieves the list of error logs
   *
   * @returns {Array} An array of error logs
   */
  getErrorLogs() {
    return this.get('errorLogs').slice();
  },

  /**
   * A method to send error logs to a server or external logging service
   *
   * @param {Array} logs An array of error logs to send
   * @returns {Promise} A promise that resolves when the logs are sent
   */
  async sendLogsToServer(logs) {
    try {
      // Assuming an API endpoint '/api/error-logs'
      const response = await fetch('/api/error-logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logs),
      });

      if (!response.ok) throw new Error('Network response was not ok.');

      return response.json();
    } catch (e) {
      console.error('Failed to send error logs:', e);
      throw e;
    }
  },

  // ... Additional methods and logic here ...
});