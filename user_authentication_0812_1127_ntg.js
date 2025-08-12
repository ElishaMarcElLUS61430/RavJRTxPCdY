// 代码生成时间: 2025-08-12 11:27:01
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { isNone } from '@ember/utils';
import { A as emberArray } from '@ember/array';

export default class UserAuthenticationService extends Service {
  @service('session') session; // Dependency injection for session service
  @tracked errorMessages = emberArray(); // Tracked property for displaying error messages

  // Function to authenticate user with provided credentials
  @action
  async authenticateUser(username, password) {
    try {
      // Assuming session service has authenticate method
      await this.session.authenticate('authenticator:user-password', {
        username,
        password
      });
      this.errorMessages.clear(); // Clear error messages upon successful login
    } catch (error) {
      // Handle authentication error
      this.handleError(error);
    }
  }

  // Function to logout the user
  @action
  logoutUser() {
    this.session.invalidate(); // Invalidate session to logout user
  }

  // Error handling function
  handleError(error) {
    const errorMessage = error.message || 'An unknown error occurred';
    this.errorMessages.pushObject(errorMessage); // Store error message for display
  }

  // Function to check if user is authenticated
  get isUserAuthenticated() {
    return this.session.isAuthenticated; // Return session's isAuthenticated property
  }
}
