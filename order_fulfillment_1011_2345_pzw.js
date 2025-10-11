// 代码生成时间: 2025-10-11 23:45:52
import Ember from 'ember';

export default Ember.Controller.extend({
  // Inject the service that handles API calls to the backend
  api: Ember.inject.service('api'),

  // Array to hold orders
  orders: Ember.A(),

  // Error message for display
  errorMessage: Ember.computed(''),

  // Add a new order
  addOrder(orderDetails) {
    try {
      // Call the API service to create a new order
      const newOrder = this.get('api').createOrder(orderDetails);
      // Add new order to the orders array
      this.get('orders').addObject(newOrder);
    } catch (error) {
      // Handle any errors that occur during order creation
      this.set('errorMessage', error.message);
    }
  },

  // Update an existing order
  updateOrder(order, updatedDetails) {
    try {
      // Call the API service to update the order
      const updatedOrder = this.get('api').updateOrder(order, updatedDetails);
      // Update the order in the orders array
      this.get('orders').replace(this.get('orders').indexOf(order), 1, [updatedOrder]);
    } catch (error) {
      // Handle any errors that occur during order update
      this.set('errorMessage', error.message);
    }
  },

  // Ship an order
  shipOrder(order) {
    try {
      // Call the API service to ship the order
      const shippedOrder = this.get('api').shipOrder(order);
      // Update the order status in the orders array
      this.get('orders').replace(this.get('orders').indexOf(order), 1, [shippedOrder]);
    } catch (error) {
      // Handle any errors that occur during shipping
      this.set('errorMessage', error.message);
    }
  },

  // Clear error message
  clearErrorMessage() {
    this.set('errorMessage', '');
  },

  // Actions for route hooks
  actions: {
    // Action to add an order
    addNewOrder(orderDetails) {
      this.addOrder(orderDetails);
    },

    // Action to update an order
    updateOrderAction(order, updatedDetails) {
      this.updateOrder(order, updatedDetails);
    },

    // Action to ship an order
    shipOrderAction(order) {
      this.shipOrder(order);
    },

    // Action to clear error message
    clearErrorMessageAction() {
      this.clearErrorMessage();
    },
  }
});