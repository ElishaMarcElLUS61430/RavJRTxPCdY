// 代码生成时间: 2025-08-01 17:07:34
 * It is designed to be clear, maintainable, and extensible.
 */

import Ember from 'ember';
import { action } from '@ember/object';

const { Service } = Ember;

export default class UserPermissionManager extends Service {
  // User roles
  userRoles = ['admin', 'editor', 'viewer'];

  constructor() {
    super(...arguments);
    // Initialize permissions
    this.permissions = this.initializePermissions();
  }

  /**
   * Initialize permissions based on user roles
   * @returns {Object} Permissions object
   */
  initializePermissions() {
    return this.userRoles.reduce((permissions, role) => {
      permissions[role] = {
        'read': true,
        'write': role !== 'viewer',
        'delete': role === 'admin'
      };
      return permissions;
    }, {});
  }

  /**
   * Check if a user has a specific permission
   * @param {String} role - The user's role
   * @param {String} permission - The permission to check
   * @returns {Boolean} - Whether the user has the permission
   */
  hasPermission(role, permission) {
    if (!this.permissions[role]) {
      throw new Error(`Role '${role}' is not recognized`);
    }
    return this.permissions[role][permission];
  }

  /**
   * Update a user's permissions based on their role
   * @param {String} role - The user's role
   * @param {Object} newPermissions - New permissions for the role
   */
  @action
  updatePermissions(role, newPermissions) {
    if (!this.userRoles.includes(role)) {
      throw new Error(`Role '${role}' is not recognized`);
    }
    this.permissions[role] = newPermissions;
  }

  /**
   * Add a new role with the default permissions
   * @param {String} role - The new role to add
   */
  @action
  addRole(role) {
    if (this.userRoles.includes(role)) {
      throw new Error(`Role '${role}' already exists`);
    }
    this.userRoles.push(role);
    this.permissions[role] = this.initializePermissions()[role];
  }

  /**
   * Remove a role and its associated permissions
   * @param {String} role - The role to remove
   */
  @action
  removeRole(role) {
    if (!this.userRoles.includes(role)) {
      throw new Error(`Role '${role}' does not exist`);
    }
    this.userRoles = this.userRoles.filter(r => r !== role);
    delete this.permissions[role];
  }
}
