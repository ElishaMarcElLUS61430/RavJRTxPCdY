// 代码生成时间: 2025-08-30 18:45:56
import Ember from 'ember';

// Component to display notifications
export default Ember.Component.extend({
  notifications: Ember.computed(function() {
    return Ember.A(); // An array to hold the notifications
  }),
  
  init() {
    this._super(...arguments);
    this.setupNotificationListener();
  },
  
  // Set up a listener to receive notifications
  setupNotificationListener() {
    Ember.on('notification', this, function(notification) {
      this.addNotification(notification);
    });
  },
  
  // Add a notification to the notifications array
  addNotification(notification) {
    try {
      this.get('notifications').addObject(notification);
    } catch (error) {
      console.error('Error adding notification:', error);
    }
  },
  
  // Handle action to clear notifications
  clearNotifications() {
    this.get('notifications').clear();
  },
  
  // Will be called when the component is destroyed
  willDestroy() {
    Ember.off('notification', this, this.addNotification);
  },
  
  actions: {
    // Action to send a notification
    sendNotification(notificationText) {
      try {
        // Simulate sending a notification
        const notification = {
          text: notificationText,
          timestamp: new Date().toISOString()
        };
        this.addNotification(notification);
        // Optionally, send the notification to a server or other components
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    },
  }
});