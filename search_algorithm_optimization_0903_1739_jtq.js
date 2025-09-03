// 代码生成时间: 2025-09-03 17:39:48
import Ember from 'ember';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

/*
 * SearchService is a service that encapsulates the logic for
 * performing searches and optimizing them.
 */
export default class SearchService extends Ember.Service {
  @tracked results = A();
  @tracked searchTerm = '';
  @tracked error = null;

  /*
   * Searches for items based on the current search term.
   *
   * @param {string} term The search term to look for.
   * @returns {Promise} A promise that resolves with the search results.
   */
  @action
  async search(term) {
    this.searchTerm = term;
    this.error = null;
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
      if (!response.ok) {
        throw new Error(`Search failed with status: ${response.status}`);
      }
      const data = await response.json();
      this.results = A(data);
    } catch (error) {
      this.error = error;
    }
  }
}

/*
 * SearchComponent is the component that interacts with the user
 * to receive search input and display search results.
 */
export default class SearchComponent extends Ember.Component {
  @tracked searchService = Ember.inject.service('search');

  /*
   * Handles the input event from the search input field.
   *
   * @param {Event} event The event fired when the user types in the search input.
   */
  @action
  handleSearchInput(event) {
    const searchTerm = event.target.value;
    this.searchService.search(searchTerm);
  }

  /*
   * Renders the search results.
   *
   * @returns {SafeString} The HTML to display the search results.
   */
  results() {
    return this.searchService.results.map(result => {
      return Ember.htmlSafe(`<li>${result.name}</li>`);
    }).join('');
  }

  /*
   * Renders the error message if there is one.
   *
   * @returns {SafeString|null} The HTML to display the error message or null if there is no error.
   */
  error() {
    if (this.searchService.error) {
      return Ember.htmlSafe(`<div class="error">${this.searchService.error.message}</div>`);
    }
    return null;
  }
}
