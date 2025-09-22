// 代码生成时间: 2025-09-22 15:05:36
import Application from '@ember/application';
import Resolver from 'ember-resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;

/**
 * Data Analysis Service
 * Provides statistical analysis of data.
 */
import Service from '@ember/service';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default class DataAnalysisService extends Service {
  /**
   * An array to hold data for analysis.
   */
  data = A();

  /**
   * Computes the mean of the data set.
   *
   * @returns {Number} The mean of the data set.
   */
  get mean() {
    let sum = 0;
    try {
      this.data.forEach(item => {
        sum += parseFloat(item);
      });
      return sum / this.data.length;
    } catch (error) {
      // Handle any errors that occur during computation.
      console.error('Error calculating mean:', error);
      return null;
    }
  }

  /**
   * Computes the median of the data set.
   *
   * @returns {Number} The median of the data set.
   */
  get median() {
    try {
      let sortedData = this.data.slice().sort((a, b) => parseFloat(a) - parseFloat(b));
      let middleIndex = Math.floor(sortedData.length / 2);
      if (sortedData.length % 2 === 0) {
        return (sortedData[middleIndex] + sortedData[middleIndex - 1]) / 2;
      } else {
        return sortedData[middleIndex];
      }
    } catch (error) {
      // Handle any errors that occur during computation.
      console.error('Error calculating median:', error);
      return null;
    }
  }

  /**
   * Computes the mode of the data set.
   *
   * @returns {Number} The mode of the data set.
   */
  get mode() {
    try {
      let frequency = {};
      this.data.forEach(item => {
        let count = frequency[item] || 0;
        frequency[item] = count + 1;
      });
      let maxFrequency = Math.max(...Object.values(frequency));
      return Object.keys(frequency).reduce((modes, key) => {
        if (frequency[key] === maxFrequency) {
          modes.push(parseFloat(key));
        }
        return modes;
      }, []);
    } catch (error) {
      // Handle any errors that occur during computation.
      console.error('Error calculating mode:', error);
      return null;
    }
  }
}

/**
 * Data Analysis Controller
 * Handles data analysis and user interactions.
 */
import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class DataAnalysisController extends Controller {
  @service dataAnalysis;

  /**
   * Adds data to the data analysis service.
   *
   * @param {Object} data The data to add.
   */
  @action
  addData(data) {
    try {
      this.dataAnalysis.data.addObject(data);
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  /**
   * Resets the data analysis service.
   */
  @action
  resetAnalysis() {
    this.dataAnalysis.data.clear();
  }
}

/**
 * Route for data analysis.
 * Handles the routing and setup for data analysis.
 */
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DataAnalysisRoute extends Route {
  @service dataAnalysis;

  model() {
    return {
      dataAnalysis: this.dataAnalysis
    };
  }
}

/**
 * Template for data analysis.
 * Displays the data analysis interface.
 */
export default function dataAnalysisTemplate() {
  return `
    <h1>Data Analysis</h1>
    <button {{on "click" this.addData}}>Add Data</button>
    <button {{on "click" this.resetAnalysis}}>Reset Analysis</button>
    <div>Mean: {{this.mean}}</div>
    <div>Median: {{this.median}}</div>
    <div>Mode: {{this.mode}}</div>
  `;
}
