// 代码生成时间: 2025-09-23 09:13:07
import Ember from 'ember';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UserPermissionManager extends Ember.Component {
  @service('permission-manager') permissionManager; // Dependency injection of permission manager service

  @tracked users = []; // Tracked property to hold users data
  @tracked permissions = []; // Tracked property to hold permissions data
  @tracked selectedUser = null; // Tracked property to hold the selected user
  @tracked newPermission = ''; // Tracked property for the new permission input

  // Fetch users and permissions from the server
  didInsertElement() {
    try {
      this.fetchUsers();
      this.fetchPermissions();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Fetch users from the server
  async fetchUsers() {
    try {
      this.users = await this.permissionManager.fetchUsers();
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  // Fetch permissions from the server
  async fetchPermissions() {
    try {
      this.permissions = await this.permissionManager.fetchPermissions();
    } catch (error) {
      console.error('Error fetching permissions:', error);
    }
  }

  // Handle user selection change
  @action
  onUserSelect(user) {
    this.selectedUser = user;
  }

  // Add a new permission to the selected user
  @action
  async addUserPermission() {
    if (!this.selectedUser || !this.newPermission) {
      console.warn('Please select a user and enter a permission.');
      return;
    }
    try {
      await this.permissionManager.addUserPermission(this.selectedUser, this.newPermission);
      this.newPermission = ''; // Clear input after adding permission
      this.fetchPermissions(); // Refresh permissions
    } catch (error) {
      console.error('Error adding permission:', error);
    }
  }

  // Remove a permission from the selected user
  @action
  async removeUserPermission(permission) {
    if (!this.selectedUser || !permission) {
      console.warn('Please select a user and choose a permission to remove.');
      return;
    }
    try {
      await this.permissionManager.removeUserPermission(this.selectedUser, permission);
      this.fetchPermissions(); // Refresh permissions
    } catch (error) {
      console.error('Error removing permission:', error);
    }
  }
}
