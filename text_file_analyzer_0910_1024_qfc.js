// 代码生成时间: 2025-09-10 10:24:30
 * Features:
 * - Reads text files
 * - Analyzes word frequency
 * - Error handling
 */

import Ember from 'ember';
import RSVP from 'rsvp';
import { isPresent } from '@ember/utils';
import Service from '@ember/service';
import FileSaver from 'file-saver';
import Papa from 'papaparse';

export default class TextFileAnalyzer extends Service {
  // Property to store the content of the file
  fileContent = '';

  // Method to read the content of a file
  readFile(file) {
    return new RSVP.Promise((resolve, reject) => {
      // Check if the file is present
      if (!isPresent(file)) {
        reject(new Error('No file provided'));
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.fileContent = event.target.result;
        resolve(this.fileContent);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsText(file);
    });
  }

  // Method to analyze the frequency of words in the file content
  analyzeWordFrequency(content) {
    if (!content) {
      throw new Error('No content provided for analysis');
    }

    // Split the content into words and count their frequency
    const words = content.split(/\s+/);
    const frequency = {};
    words.forEach((word) => {
      const trimmedWord = word.toLowerCase().replace(/[^a-z0-9]/gi, '');
      if (trimmedWord) {
        frequency[trimmedWord] = (frequency[trimmedWord] || 0) + 1;
      }
    });

    return frequency;
  }

  // Method to export the analysis results to a CSV file
  exportResultsAsCSV(results) {
    const csvData = Papa.unparse(results);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    FileSaver.saveAs(blob, 'word_frequency.csv');
  }
}

// Usage Example (should be placed in a route or component that has access to the textFileAnalyzer service):

// textFileAnalyzer.readFile(fileInput.files[0])
//   .then(content => {
//     const results = textFileAnalyzer.analyzeWordFrequency(content);
//     textFileAnalyzer.exportResultsAsCSV(results);
//   })
//   .catch(error => {
//     console.error('Error reading or analyzing file:', error);
//   });
