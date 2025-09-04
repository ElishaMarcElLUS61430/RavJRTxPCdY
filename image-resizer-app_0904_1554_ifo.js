// 代码生成时间: 2025-09-04 15:54:28
// Image Resizer App using Ember.js
// This Ember application allows users to resize images in batch.

import Ember from 'ember';

// Define the ImageResizer Component
export default Ember.Component.extend({
  // The array to hold image URLs
  images: Ember.A(),
  
  // The new size for the images
  newSize: {
    width: 100,
    height: 100
  },
  
  // Action for resizing images
  resizeImages: Ember.on('didInsertElement', function() {
    // Check if images array is not empty
    if (this.get('images.length') > 0) {
      // Resize each image
      this.get('images').forEach((imageUrl) => {
        // Error handling: Check if imageUrl is a valid string
        if (typeof imageUrl !== 'string') {
          Ember.Logger.error('Invalid image URL:', imageUrl);
          return;
        }
        
        try {
          // Using fetch to get the image blob
          fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => this.resizeImage(blob))
            .then(resizedImage => {
              // Handle the resized image, e.g., creating a download link
              const url = URL.createObjectURL(resizedImage);
              const anchor = document.createElement('a');
              anchor.href = url;
              anchor.download = 'resized-image.jpg';
              anchor.click();
            })
            .catch(error => Ember.Logger.error('Error resizing image:', error));
        } catch (error) {
          Ember.Logger.error('Error fetching image:', error);
        }
      });
    }
  }),
  
  // Method to resize an image
  resizeImage: function(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = this.get('newSize.width');
          canvas.height = this.get('newSize.height');
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const resizedBlob = canvas.toDataURL('image/jpeg');
          resolve(resizedBlob);
        };
        img.onerror = (error) => reject(error);
        img.src = event.target.result;
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  },
  
  // Add image URL to the array
  addImage: function(imageURL) {
    this.get('images').pushObject(imageURL);
  },
  
  // Remove image URL from the array
  removeImage: function(imageURL) {
    this.get('images').removeObject(imageURL);
  },

  // Clears all images from the array
  clearImages: function() {
    this.set('images', Ember.A());
  }
});