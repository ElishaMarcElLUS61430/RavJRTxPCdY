// 代码生成时间: 2025-10-06 20:59:55
import Ember from 'ember';
import Product from './models/product';
import User from './models/user';

// Service to handle product recommendations
export default Ember.Service.extend({
  // Dependency injections
  store: Ember.inject.service(),
  // Private properties
  _userPreferences: null,

  init() {
    this._super(...arguments);
    this._userPreferences = {};
  },

  // Public methods
  recommendProducts(userId) {
    // Fetch user preferences if not already set
    if (!this._userPreferences[userId]) {
      this._userPreferences[userId] = this.getUserPreferences(userId);
    }

    // Fetch products from the store
    return this.store.findAll('product').then(products => {
      // Filter products based on user preferences
      return this.filterProducts(products, this._userPreferences[userId]);
    }).catch(error => {
      // Handle errors in fetching products
      console.error('Error fetching products', error);
      return [];
    });
  },

  getUserPreferences(userId) {
    // Fetch user preferences from the store
    return this.store.findRecord('user', userId).then(user => {
      // Extract preferences from the user model
      return user.get('preferences');
    }).catch(error => {
      // Handle errors in fetching user preferences
      console.error('Error fetching user preferences', error);
      return {};
    });
  },

  filterProducts(products, preferences) {
    // Filter products based on user preferences
    return products.filter(product => {
      // Check if the product matches the user's preferences
      return preferences.includes(product.get('category'));
    });
  }
});