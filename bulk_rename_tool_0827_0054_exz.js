// 代码生成时间: 2025-08-27 00:54:14
import Ember from 'ember';
import { ajax } from '@ember/ajax';
import { task } from 'ember-concurrency';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import FileSaver from 'file-saver';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { reject } from 'rsvp';

export default class BulkRenameTool extends Ember.Component {
  @tracked filesToRename = [];
  @tracked renamePattern = '';
  @tracked error = null;
  @tracked successMessage = '';

  // Task to handle the bulk renaming operation
  @task
  *performBulkRename() {
    try {
      if (this.filesToRename.length === 0) {
        throw new Error('No files selected for renaming.');
      }

      for (const file of this.filesToRename) {
        const newFileName = this.generateNewFileName(file.name);
        yield this.renameFile(file.path, newFileName);
      }

      this.set('successMessage', 'Files renamed successfully.');
    } catch (error) {
      this.set('error', error.message);
    }
  }

  // Generates a new file name based on the provided pattern
  generateNewFileName(oldName) {
    const pattern = this.renamePattern;
    // Implement pattern matching and replacement logic here
    // For simplicity, assume we just append a UUID to the file name
    return `${oldName}_${uuidv4()}.ext`;
  }

  // Renames a single file
  *renameFile(oldPath, newPath) {
    // Check if the file exists
    if (!fs.existsSync(oldPath)) {
      throw new Error(`File not found: ${oldPath}`);
    }
    // Check if the new file name already exists
    if (fs.existsSync(newPath)) {
      throw new Error(`File already exists: ${newPath}`);
    }
    // Rename the file
    fs.renameSync(oldPath, newPath);
  }

  // Action to handle file selection
  @action
  selectFiles(event) {
    const files = event.target.files;
    if (!files.length) {
      this.set('error', 'No files selected.');
      return;
    }

    this.set('filesToRename', Array.from(files).map(file => ({
      name: file.name,
      path: file.path
    })));
  }

  // Action to trigger the rename operation
  @action
  renameFiles() {
    this.performBulkRename.perform();
  }
}
