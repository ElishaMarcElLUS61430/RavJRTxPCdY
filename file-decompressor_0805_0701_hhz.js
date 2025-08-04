// 代码生成时间: 2025-08-05 07:01:11
import Ember from 'ember';
import FileSaver from 'file-saver';
import JSZip from 'jszip';

/*
 * FileDecompressor Component
 * This Ember component provides a file decompression tool.
 * It handles the file upload and decompression process.
 */
export default Ember.Component.extend({
  // Bound action to handle file selection
  onFileSelected: Ember.computed('selectedFile', function() {
    return () => {
      let file = this.get('selectedFile');
      if (!file) {
        throw new Error('No file selected');
      }
      this.decompressFile(file);
    };
  }),
  
  // Decompression function using JSZip
  decompressFile: function(file) {
    JSZip.loadAsync(file).then((zip) => {
      zip.forEach((relativePath, zipEntry) => {
        zipEntry.async('blob').then((content) => {
          let url = URL.createObjectURL(content);
          let saveLink = document.createElement('a');
          saveLink.href = url;
          saveLink.download = zipEntry.name;
          document.body.appendChild(saveLink);
          saveLink.click();
          document.body.removeChild(saveLink);
          URL.revokeObjectURL(url);
        }, (error) => {
          console.error('Error decompressing file:', error);
        });
      });
    }, (error) => {
      console.error('Error loading file:', error);
    });
  },
  
  // Action to reset the file input
  resetFileInput: function() {
    this.set('selectedFile', null);
  },
  
  // Action to handle file input change
  handleFileInput: function(event) {
    let file = event.target.files[0];
    this.set('selectedFile', file);
    this.get('onFileSelected')();
  },
  
  // Computed property to get file name for display
  fileName: Ember.computed('selectedFile', function() {
    let file = this.get('selectedFile');
    return file ? file.name : 'No file selected';
  }),
  
  // Ember lifecycle hook, clean up the component
  willDestroyElement() {
    let fileInput = this.$('input[type=file]');
    fileInput.off('change');
    fileInput.remove();
  },
  
  // Template for the component
  layout: Ember.HTMLBars.compile(`
    <div>
      <input type="file" accept=".zip, .rar, .tar" onchange={{action "handleFileInput" target=view}} />
      <button onclick={{action "resetFileInput" target=view}}>Reset</button>
      <p>Selected File: {{fileName}}</p>
    </div>
  `),
});