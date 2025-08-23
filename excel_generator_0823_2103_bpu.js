// 代码生成时间: 2025-08-23 21:03:31
import Ember from 'ember';
import Papa from 'papaparse';
import FileSaver from 'file-saver';
import Blob from 'blob';

// Define the ExcelGenerator service
export default Ember.Service.extend({
  /**
   * Generates an Excel file from given data.
   *
   * @param {Array} data - The data to be written into the Excel file.
   * @param {String} filename - The name of the Excel file.
   * @returns {void}
   */
  generateExcel(data, filename) {
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid data: Data should be a non-empty array.');
    }

    if (typeof filename !== 'string' || filename.trim() === '') {
      throw new Error('Invalid filename: Filename should be a non-empty string.');
    }

    try {
      // Convert data to CSV format
      const csv = Papa.unparse(data);
      // Create a new Blob object with CSV data and text type
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      // Use FileSaver to save the Blob as a file with the given filename
      FileSaver.saveAs(blob, `${filename}.csv`);
    } catch (error) {
      console.error('Error generating Excel file:', error);
    }
  }
});