// 代码生成时间: 2025-08-12 21:46:27
// Import necessary modules and dependencies
import Ember from 'ember';
import fs from 'fs-extra';
import path from 'path';

// Define the FolderOrganizer service
export default Ember.Service.extend({
  organizeDirectory(directoryPath) {
    // Check if the directory exists
    return fs.pathExists(directoryPath)
      .then(exists => {
        if (!exists) {
          throw new Error(`Directory does not exist: ${directoryPath}`);
        }

        // List all files and directories within the given path
        return fs.readdir(directoryPath);
      }).then(files => {
        // Organize files into categories (e.g., images, documents, etc.)
        const categories = {
          images: [],
          documents: [],
          other: []
        };

        files.forEach(file => {
          const filePath = path.join(directoryPath, file);
          return fs.stat(filePath)
            .then(stats => {
              if (stats.isFile()) {
                const extension = path.extname(file).toLowerCase();
                switch (extension) {
                  case '.jpg':
                  case '.jpeg':
                  case '.png':
                  case '.gif':
                    categories.images.push(file);
                    break;
                  case '.pdf':
                  case '.docx':
                  case '.txt':
                    categories.documents.push(file);
                    break;
                  default:
                    categories.other.push(file);
                }
              } else {
                // Recursively organize subdirectories
                return this.organizeDirectory(filePath).then(() => {
                  categories.other.push(file);
                });
              }
            });
        });

        // Return the organized categories
        return categories;
      }).catch(error => {
        // Handle any errors that occur during the process
        console.error(`Error organizing directory: ${error.message}`);
        throw error;
      });
  }
});
