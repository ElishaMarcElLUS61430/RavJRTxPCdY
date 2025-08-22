// 代码生成时间: 2025-08-22 08:34:52
 * This component checks the validity of a given URL string.
 */
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { isEmpty } from '@ember/utils';
import { assert } from '@ember/debug';
import URL from 'url';

export default class UrlValidatorComponent extends Component {
  // The URL to be validated.
  urlToValidate = '';

  // Validate the URL.
  @action
  validateUrl() {
    // Clear any previous errors.
    this.args.setError(null);

    try {
      // Attempt to parse the URL.
      new URL(this.urlToValidate);
      // If parsing is successful, the URL is valid.
      this.args.setValid(true);
    } catch (error) {
      // If parsing fails, the URL is invalid.
      // Set the error message to be displayed.
      this.args.setValid(false);
      this.args.setError('Invalid URL format.');
    }
  }

  // Handle URL input changes.
  @action
  urlChanged(event) {
    this.urlToValidate = event.target.value;
  }
}
