// 代码生成时间: 2025-09-11 14:11:56
import Ember from 'ember';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class AccessControlRoute extends Route {
  @service('auth') auth; // Injecting the authentication service
  @tracked allowed = false; // Tracked property to store access control state

  // Before model hook to check permissions before loading the route's model
  beforeModel() {
    try {
      this.checkAccess();
    } catch (error) {
      this.transitionTo('unauthorized'); // Redirect to unauthorized if access is denied
    }
  }

  // Method to check if the user has access based on their roles
  checkAccess() {
    const userRoles = this.auth.getCurrentUserRoles(); // Retrieve user roles from the auth service
    // Define the roles that have access to this route
    const allowedRoles = ['admin', 'editor'];

    if (!userRoles.some(role => allowedRoles.includes(role))) {
      throw new Error('Access Denied'); // Throw an error if user does not have the required role
    }

    this.allowed = true; // Update the access control state if user has access
  }

  // Action to handle unauthorized access
  @action
  handleUnauthorizedAccess() {
    this.auth.logout(); // Log out the user if access is unauthorized
    this.transitionTo('login'); // Redirect to login page
  }

  // Setup controller hook to set the allowed property on the controller
  setupController(controller, model) {
    super.setupController(...arguments);
    controller.set('allowed', this.allowed); // Pass the access control state to the controller
  }
}
