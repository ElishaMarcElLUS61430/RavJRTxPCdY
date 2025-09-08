// 代码生成时间: 2025-09-09 07:38:55
import EmberObject from '@ember/object';
import { isEmpty } from '@ember/utils';
import { computed } from '@ember/object/computed';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { assert } from '@ember/debug';

export default Service.extend({
  // Service that handles file operations
  fileService: service('file'),
  
  // Array to hold parsed logs
  parsedLogs: A(),
  
  /**
   * Parses a log file and stores the result in `parsedLogs`.
   *
   * @param {string} filePath - The path to the log file.
   * @returns {Promise} - A promise that resolves with the parsed logs.
   */
  parseLogFile(filePath) {
    return new Promise((resolve, reject) => {
      try {
        // Read the file content
        this.get('fileService').read(filePath)
          .then(fileContent => {
            // Split the content into lines
            const lines = fileContent.split('
');
            
            // Initialize an array to hold the parsed logs
            const logs = [];
            
            // Iterate over each line and parse it
            lines.forEach(line => {
              if (!isEmpty(line)) {
                // Assuming the log format is 'timestamp - level - message'
                const parts = line.split(' - ');
                const timestamp = parts[0];
                const level = parts[1];
                const message = parts.slice(2).join(' - ');
                
                // Create a log object and add it to the array
                logs.pushObject(EmberObject.create({
                  timestamp,
                  level,
                  message
                }));
              }
            });
            
            // Set the parsed logs and resolve the promise
            this.set('parsedLogs', logs);
            resolve(this.get('parsedLogs'));
          })
          .catch(error => reject(error));
      } catch (error) {
        // Handle any exceptions that occur during file reading or parsing
        reject(error);
      }
    });
  },
  
  /**
   * Clears the parsed logs.
   *
   * @returns {void}
   */
  clearParsedLogs() {
    this.set('parsedLogs', A());
  },
  
  // Computed property that filters logs by level
  filteredLogs: computed('parsedLogs.@each.level', function() {
    return this.get('parsedLogs').filterBy('level', this.get('filterLevel'));
  }),
  
  // Property to hold the current filter level
  filterLevel: null,
  
  /**
   * Sets the filter level and updates the filtered logs.
   *
   * @param {string} level - The level to filter by.
   * @returns {void}
   */
  setFilterLevel(level) {
    this.set('filterLevel', level);
  },
  
  /**
   * Resets the filter level to show all logs.
   *
   * @returns {void}
   */
  resetFilter() {
    this.set('filterLevel', null);
  }
});