// 代码生成时间: 2025-08-10 17:40:58
 * Features:
 * - Error handling for file operations
 * - Maintainability and extensibility
 *
 * @author Your Name
 * @version 1.0
 */

import Ember from 'ember';
import Resizer from 'your-app-name/utils/resizer'; // Assuming a Resizer utility
import { isNone } from '@ember/utils';

export default Ember.Service.extend({
  // Service to handle image resizing
  resizeImages(files, targetSize) {
    let resizedImages = [];
    let promises = files.map((file) => {
      return new Ember.RSVP.Promise((resolve, reject) => {
        try {
          let reader = new FileReader();
          reader.onload = (event) => {
            let img = new Image();
            img.onload = () => {
              let resized = Resizer.resize(img, targetSize);
              let resizedBlob = Resizer.toBlob(resized, 'image/jpeg', 0.8); // 80% quality
              resizedImages.push(resizedBlob);
              resolve(resizedBlob);
            };
            img.onerror = reject;
            img.src = event.target.result;
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        } catch (error) {
          reject(error);
        }
      });
    });

    return Ember.RSVP.all(promises).then(() => {
      return resizedImages;
    }).catch((error) => {
      throw new Error('Failed to resize images: ' + error.message);
    });
  }
});