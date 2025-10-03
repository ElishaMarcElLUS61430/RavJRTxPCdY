// 代码生成时间: 2025-10-04 02:02:25
import Ember from 'ember';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { copy } from 'fs-extra';
import rimraf from 'rimraf';

// Promisify the rimraf function for async usage
const rimrafAsync = promisify(rimraf);

export default Ember.Service.extend({
  // The source directory to backup from
  sourceDir: Ember.computed('*'),
  // The destination directory to sync to
  destDir: Ember.computed('*'),
  // A flag to check if the backup is in progress
  backupInProgress: false,
  
  // Initiate a backup operation
  async backupFiles() {
    try {
      this.set('backupInProgress', true);
      // Check if the source directory exists
      if (!fs.existsSync(this.get('sourceDir'))) {
        throw new Error(`Source directory ${this.get('sourceDir')} does not exist`);
      }
      // Create the destination directory if it does not exist
      await fs.promises.mkdir(this.get('destDir'), { recursive: true });
      // Copy files from source to destination
      await copy(this.get('sourceDir'), this.get('destDir'));
    } catch (error) {
      console.error('Backup failed:', error);
    } finally {
      this.set('backupInProgress', false);
    }
  },
  
  // Initiate a synchronization operation
  async syncFiles() {
    try {
      this.set('backupInProgress', true);
      // Check if the source and destination directories exist
      if (!fs.existsSync(this.get('sourceDir')) || !fs.existsSync(this.get('destDir'))) {
        throw new Error('Both source and destination directories must exist');
      }
      // Remove all files in the destination directory
      await rimrafAsync(path.join(this.get('destDir'), '*'));
      // Copy files from source to destination
      await copy(this.get('sourceDir'), this.get('destDir'));
    } catch (error) {
      console.error('Synchronization failed:', error);
    } finally {
      this.set('backupInProgress', false);
    }
  },
  
  // Reset the backup in progress flag and clear the destination directory
  async reset() {
    try {
      this.set('backupInProgress', true);
      // Remove all files in the destination directory
      await rimrafAsync(path.join(this.get('destDir'), '*'));
    } catch (error) {
      console.error('Reset failed:', error);
    } finally {
      this.set('backupInProgress', false);
    }
  },
  
  // Check if the backup operation is in progress
  isBackupInProgress: Ember.computed('backupInProgress', function() {
    return this.get('backupInProgress');
  })
});