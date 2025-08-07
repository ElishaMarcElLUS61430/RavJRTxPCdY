// 代码生成时间: 2025-08-07 15:52:10
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
import { A } from '@ember/array';

export default class UserAuthenticationService extends Service {
  @service store;
  @service session;
  @tracked isAuthenticated = false;
  @tracked errors = A();

  /*
   * Attempts to authenticate a user with provided credentials.
   * @param {Object} credentials - An object containing username and password.
   * @returns {Promise} - A promise that resolves on authentication success or rejects on failure.
   */
  @action
  async authenticate(credentials) {
    try {
      if (!credentials || !credentials.username || !credentials.password) {
        throw new Error('Missing credentials');
      }

      const user = await this.store.findRecord('user', credentials.username);
      if (!user || !user.validatePassword(credentials.password)) {
        throw new Error('Invalid username or password');
      }

      this.session.authenticate('authenticator:application', user.get('id'));
      set(this, 'isAuthenticated', true);
      this.errors.clear();
    } catch (error) {
      this.errors.pushObject(error.message);
      set(this, 'isAuthenticated', false);
    }
  }

  /*
   * Logs out the current user.
   */
  @action
  logout() {
    this.session.invalidate();
    set(this, 'isAuthenticated', false);
  }

  /*
   * Checks if the user is authenticated.
   * @returns {boolean} - True if the user is authenticated, false otherwise.
   */
  @action
  checkAuthentication() {
    return this.isAuthenticated;
  }
}
