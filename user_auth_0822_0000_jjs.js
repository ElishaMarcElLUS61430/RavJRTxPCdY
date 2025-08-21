// 代码生成时间: 2025-08-22 00:00:30
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';

// UserAuthRoute handles user authentication
export default class UserAuthRoute extends Route {
  @service('auth') auth;
  @tracked errorMessage = '';
  @tracked user = A(['username', 'password']);

  // Validate and authenticate the user
  @action
  async authenticate() {
    this.errorMessage = '';
    try {
      if (isEmpty(this.user.username) || isEmpty(this.user.password)) {
        throw new Error('Username and password cannot be empty.');
      }
      // Here, we assume 'authenticateUser' is an async method provided by the auth service
      // that returns a boolean indicating whether the authentication was successful or not.
      const isAuthenticated = await this.auth.authenticateUser(this.user.username, this.user.password);
      if (!isAuthenticated) {
        throw new Error('Authentication failed. Please check your credentials.');
      }
      // Redirect to the dashboard if authentication is successful
      this.transitionTo('dashboard');
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Reset the user input fields
  @action
  resetForm() {
    this.user = A(['', '']);
  }
}
