// 代码生成时间: 2025-09-16 16:43:31
import EmberObject from '@ember/object';
import { later } from '@ember/runloop';
import { A } from '@ember/array';

// TimerScheduler
// A simple Ember service to manage and schedule timer tasks.
export default EmberObject.extend({
  timers: A(),

  // Schedule a timer task with a given interval and callback function.
  scheduleTask: function(interval, callback) {
    // Check if interval and callback are valid.
    if (typeof interval !== 'number' || typeof callback !== 'function') {
      throw new Error('Invalid interval or callback function.');
    }

    // Create a unique timer ID.
    const timerId = `timer-${Math.random().toString(36).substr(2, 9)}`;

    // Schedule the task using Ember's later function.
    later(() => {
      callback();
      // Check if the timer is still active before rescheduling.
      if (this.timers.includes(timerId)) {
        this.scheduleTask(interval, callback);
      }
    }, interval);

    // Store the timerId in the timers array.
    this.timers.addObject(timerId);

    return timerId;
  },

  // Cancel a scheduled timer task.
  cancelTask: function(timerId) {
    // Check if the timerId exists.
    if (!this.timers.includes(timerId)) {
      throw new Error('Timer ID not found.');
    }

    // Remove the timerId from the timers array.
    this.timers.removeObject(timerId);
  },

  // WillDestroy action to cancel all timers when the service is destroyed.
  willDestroy() {
    this._super(...arguments);
    this.timers.forEach(timerId => this.cancelTask(timerId));
  }
});