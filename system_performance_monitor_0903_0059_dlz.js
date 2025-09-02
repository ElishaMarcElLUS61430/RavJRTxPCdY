// 代码生成时间: 2025-09-03 00:59:28
import Ember from 'ember';
import { computed } from '@ember/object';
import { task } from 'ember-concurrency';

export default Ember.Component.extend({
  // Service to get system metrics
  systemMetricsService: Ember.inject.service(),

  // Performance data to be displayed
  performanceData: null,

  // Error message for handling exceptions
  errorMessage: null,

  // Task to fetch system performance metrics
  fetchPerformanceMetrics: task(function* () {
    try {
      this.set('performanceData', yield this.systemMetricsService.getMetrics());
    } catch (error) {
      this.set('errorMessage', error.message);
    }
  }).drop(),

  // Computed property to check if data is available
  hasData: computed('performanceData', function () {
    return this.performanceData !== null;
  }),

  // Actions
  actions: {
    // Action to trigger the fetch of performance metrics
    fetchMetrics() {
      this.fetchPerformanceMetrics.perform();
    },
  },

  // Lifecycle hook to fetch metrics when component is initialized
  didInsertElement() {
    this._super(...arguments);
    this.fetchPerformanceMetrics.perform();
  },
});
