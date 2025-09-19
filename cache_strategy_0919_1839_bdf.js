// 代码生成时间: 2025-09-19 18:39:07
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { A } from '@ember/array';


// Define the CacheService
export default EmberObject.extend({
  // Internal storage for cached items
  cacheStorage: A(),

  // Method to get a cached item or retrieve it if not cached
  async getCachedData(key, fetchDataFunction) {
    try {
      // Check if the data is already in the cache
      const cachedData = this.cacheStorage.findBy('key', key);
      if (cachedData) {
        return cachedData.data;
      } else {
        // If not cached, fetch the data using the provided function
        const data = await fetchDataFunction();

        // Store the fetched data in the cache
        this.cacheStorage.addObject({ key, data });
        return data;
      }
    } catch (error) {
      // Handle any errors during the fetching or caching process
      console.error('Error fetching or caching data:', error);
      throw error;
    }
  },

  // Method to invalidate a cached item by key
  invalidateCache(key) {
    let index = this.cacheStorage.findIndex(item => item.key === key);
    if (index !== -1) {
      this.cacheStorage.splice(index, 1);
    }
  },

  // Method to clear the entire cache
  clearCache() {
    this.cacheStorage.clear();
  }
});
