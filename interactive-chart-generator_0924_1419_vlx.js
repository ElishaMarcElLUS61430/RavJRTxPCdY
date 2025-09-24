// 代码生成时间: 2025-09-24 14:19:23
import Ember from 'ember';
import Chart from 'ember-cli-chart/components/chart';

/*
 * InteractiveChartGenerator Component
 * This component serves as an interactive chart generator.
 * It allows users to select chart type and data to display.
 */
export default Chart.extend({
  // Component attributes
  chartType: null,
  chartData: null,
  chartInstance: null,

  /*
   * Initialize chart properties
   */
  init() {
    this._super(...arguments);
    this.set('chartData', []);
  },

  /*
   * Actions
   */
  actions: {
    /*
     * Change chart type action
     * @param {String} type - The type of chart to display
     */
    changeChartType(type) {
      this.set('chartType', type);
      this.resetChart();
    },

    /*
     * Update chart data action
     * @param {Array} data - The data to be displayed in the chart
     */
    updateChartData(data) {
      this.set('chartData', data);
      this.resetChart();
    },

    /*
     * Error handling for chart generation
     */
    handleError(error) {
      console.error('Error generating chart:', error);
    },
  },

  /*
   * Observe changes in chart data and type
   * and regenerate the chart accordingly.
   */
  chartDataDidChange: Ember.observer('chartData', 'chartType', function() {
    this.regenerateChart();
  }),

  /*
   * Reset the chart instance and data
   */
  resetChart() {
    if (this.get('chartInstance')) {
      this.get('chartInstance').destroy();
    }
    this.set('chartInstance', null);
  },

  /*
   * Regenerate the chart with new data and type
   */
  regenerateChart() {
    try {
      const chartType = this.get('chartType');
      const chartData = this.get('chartData');
      
      // Check if chartType and chartData are valid
      if (!chartType || !chartData.length) {
        throw new Error('Chart type or data is invalid.');
      }
      
      // Create a new chart instance based on the selected type
      this.set('chartInstance', this.createChartInstance(chartType, chartData));
    } catch (error) {
      this.send('handleError', error);
    }
  },

  /*
   * Create a chart instance based on the chart type
   * @param {String} type - The type of chart to create
   * @param {Array} data - The data for the chart
   * @returns {Object} - The chart instance
   */
  createChartInstance(type, data) {
    // This is a placeholder for creating a chart instance.
    // The actual implementation would depend on the charting library being used.
    return {
      type,
      data,
      // Other properties and methods for the chart instance
    };
  },

  /*
   * Will destroy the component and clean up resources
   */
  willDestroyElement() {
    this._super(...arguments);
    this.resetChart();
  },
});