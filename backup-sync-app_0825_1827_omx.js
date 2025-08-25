// 代码生成时间: 2025-08-25 18:27:59
 * @description This application provides a simple interface to backup and sync files.
 */

// Import dependencies
import Ember from 'ember';
import RSVP from 'rsvp';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

// Promisify fs functions for use with async/await
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const copyFile = promisify(fs.copyFile);

// Define the BackupAndSyncService
export default Ember.Service.extend({
  async backupFiles(sourcePath, backupPath) {
    // Check if the source directory exists
    try {
      await stat(sourcePath);
    } catch (error) {
      throw new Error(`Source directory does not exist: ${sourcePath}`);
    }

    // Create the backup directory if it doesn't exist
    await mkdir(backupPath, { recursive: true });

    // Read the contents of the source directory
    const files = await readdir(sourcePath);

    // Iterate over files and copy them to the backup directory
    for (const file of files) {
      const sourceFile = path.join(sourcePath, file);
      const backupFile = path.join(backupPath, file);

      try {
        await copyFile(sourceFile, backupFile);
        console.log(`Successfully backed up file: ${file}`);
      } catch (error) {
        console.error(`Error backing up file: ${file}, Error: ${error}`);
      }
    }
  },

  async syncFiles(sourcePath, destinationPath) {
    // Check if both source and destination directories exist
    try {
      await stat(sourcePath);
      await stat(destinationPath);
    } catch (error) {
      throw new Error(`Directory does not exist: ${error.path}`);
    }

    // Read the contents of both directories
    const sourceFiles = await readdir(sourcePath);
    const destinationFiles = await readdir(destinationPath);

    // Find files that are in the source but not in the destination
    const filesToSync = sourceFiles.filter(file => !destinationFiles.includes(file));

    // Iterate over files to sync and copy them to the destination
    for (const file of filesToSync) {
      const sourceFile = path.join(sourcePath, file);
      const destinationFile = path.join(destinationPath, file);

      try {
        await copyFile(sourceFile, destinationFile);
        console.log(`Successfully synced file: ${file}`);
      } catch (error) {
        console.error(`Error syncing file: ${file}, Error: ${error}`);
      }
    }
  }
});
