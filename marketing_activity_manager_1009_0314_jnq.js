// 代码生成时间: 2025-10-09 03:14:22
import Ember from 'ember';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Ember.Service.extend({
  // List to store marketing activities
  activities: A([]),

  // Add a new marketing activity
  addActivity(activityData) {
    try {
      // Validate the input data
      if (!activityData || typeof activityData !== 'object') {
        throw new Error('Invalid activity data provided.');
      }

      // Create a new activity object
      const activity = Ember.Object.create(activityData);

      // Add the activity to the list
      this.get('activities').pushObject(activity);
    } catch (error) {
      // Handle any errors that occur during activity addition
      console.error('Failed to add marketing activity:', error);
    }
  },

  // Remove an existing marketing activity
  removeActivity(activityId) {
    try {
      // Find the activity by ID and remove it
      const activity = this.get('activities').findBy('id', activityId);
      if (activity) {
        this.get('activities').removeObject(activity);
      } else {
        throw new Error('Activity not found.');
      }
    } catch (error) {
      // Handle any errors that occur during activity removal
      console.error('Failed to remove marketing activity:', error);
    }
  },

  // Update an existing marketing activity
  updateActivity(activityId, updatedData) {
    try {
      // Find the activity by ID and update it
      const activity = this.get('activities').findBy('id', activityId);
      if (activity) {
        Object.keys(updatedData).forEach(key => activity.set(key, updatedData[key]));
      } else {
        throw new Error('Activity not found.');
      }
    } catch (error) {
      // Handle any errors that occur during activity update
      console.error('Failed to update marketing activity:', error);
    }
  },

  // Get all marketing activities
  getAllActivities: computed('activities.[]', function() {
    return this.get('activities').slice();
  }),

  // Get a single marketing activity by ID
  getActivityById(activityId) {
    try {
      const activity = this.get('activities').findBy('id', activityId);
      if (activity) {
        return activity;
      } else {
        throw new Error('Activity not found.');
      }
    } catch (error) {
      // Handle any errors that occur during activity retrieval
      console.error('Failed to retrieve marketing activity:', error);
      return null;
    }
  }
});