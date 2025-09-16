// 代码生成时间: 2025-09-17 05:09:21
import EmberObject, { computed } from '@ember/object';
import Service from '@ember/service';

export default class ShoppingCart extends EmberObject.extend({
  // Service to hold cart items
  cartItems: [],

  // Method to add an item to the cart
  addItem(item) {
    if (!item || typeof item !== 'object') {
      throw new Error('Invalid item. Item must be an object.');
    }
    // Check if the item already exists in the cart
    const existingItem = this.cartItems.findBy('id', item.id);
    if (existingItem) {
      // Increment the quantity if item exists
      existingItem.set('quantity', existingItem.quantity + 1);
    } else {
      // Add new item with a default quantity of 1
      this.cartItems.pushObject(item);
    }
  },

  // Method to remove an item from the cart
  removeItem(itemId) {
    if (!itemId) {
      throw new Error('Item ID must be provided to remove an item.');
    }
    // Find the item by ID and remove it from the cart
    const itemToRemove = this.cartItems.findBy('id', itemId);
    if (itemToRemove) {
      this.cartItems.removeObject(itemToRemove);
    } else {
      throw new Error('Item not found in the cart.');
    }
  },

  // Computed property to calculate the total cost of the cart
  totalCost: computed('cartItems.@each.price', 'cartItems.@each.quantity', function() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.get('price') * item.get('quantity'));
    }, 0);
  }),

  // Method to clear the cart
  clearCart() {
    this.cartItems.clear();
  },

  // Method to get the cart items
  getCartItems() {
    return this.cartItems;
  }
}).create()
