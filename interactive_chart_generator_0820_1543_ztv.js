// 代码生成时间: 2025-08-20 15:43:34
 * Interactive Chart Generator
 * This module is designed to create an interactive chart generator
 * using JS and the Ember framework.
 *
 * @module InteractiveChartGenerator
 */

import Ember from 'ember';
import Chart from 'chart.js';
import { tracked } from '@glimmer/tracking';

export default class InteractiveChartGenerator extends Ember.Component {
  // Tracked properties for chart data and options
  @tracked chartData = {
    labels: [],
    datasets: []
  };
  @tracked chartOptions = {};

  // Reference to the chart instance
  chartInstance = null;

  // Element selector for the chart canvas
  chartCanvasSelector = '#chartCanvas';

  // Lifecycle hook to instantiate the chart on didInsertElement
  didInsertElement() {
    super.didInsertElement(...arguments);
    this.initializeChart();
  }

  // Initialize the chart with default data and options
  initializeChart() {
    try {
      const ctx = document.querySelector(this.chartCanvasSelector).getContext('2d');
      this.chartInstance = new Chart(ctx, {
        type: 'bar',
        data: this.chartData,
        options: this.chartOptions
      });
    } catch (error) {
      console.error('Error initializing chart:', error);
    }
  }

  // Update the chart data and redraw the chart
  updateChartData(newData) {
    if (this.chartInstance) {
      this.chartData = newData;
      this.chartInstance.data = this.chartData;
      this.chartInstance.update();
    } else {
      console.error('Chart instance is not initialized.');
    }
  }

  // Update the chart options and redraw the chart
  updateChartOptions(newOptions) {
    if (this.chartInstance) {
      this.chartOptions = newOptions;
      this.chartInstance.options = this.chartOptions;
      this.chartInstance.update();
    } else {
      console.error('Chart instance is not initialized.');
    }
  }

  // Lifecycle hook to destroy the chart on willDestroyElement
  willDestroyElement() {
    super.willDestroyElement(...arguments);
    if (this.chartInstance) {
      this.chartInstance.destroy();
      this.chartInstance = null;
    }
  }
}
