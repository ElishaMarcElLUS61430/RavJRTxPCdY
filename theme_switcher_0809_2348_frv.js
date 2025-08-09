// 代码生成时间: 2025-08-09 23:48:13
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

// ThemeSwitcher Component
export default class ThemeSwitcherComponent extends Component {
  // Injecting the theme service for managing themes
  @service themeManager;

  // List of available themes
  themes = ['light', 'dark'];

  // The current theme
  currentTheme = this.themeManager.currentTheme;

  constructor() {
    super(...arguments);
    // Subscribe to theme changes to update the current theme
    this.themeManager.subscribe(this.updateTheme.bind(this));
  }

  // Update the current theme when it changes
  updateTheme(theme) {
    this.currentTheme = theme;
  }

  // Action to handle theme switching
  @action
  switchTheme(theme) {
    try {
      // Attempt to switch to the new theme
      this.themeManager.switchTheme(theme);
    } catch (error) {
      // Handle errors, for example logging them or showing a message to the user
      console.error('Error switching theme:', error);
    }
  }
}

// ThemeManager Service
export class ThemeManagerService {
  currentTheme = 'light';
  listeners = [];

  // Method to subscribe to theme changes
  subscribe(callback) {
    this.listeners.push(callback);
  }

  // Method to notify listeners about theme changes
  notifyThemeChange(theme) {
    this.listeners.forEach((callback) => callback(theme));
  }

  // Method to switch themes
  switchTheme(theme) {
    if (!this.isValidTheme(theme)) {
      throw new Error('Invalid theme');
    }
    this.currentTheme = theme;
    document.body.className = theme;
    this.notifyThemeChange(theme);
  }

  // Method to check if the theme is valid
  isValidTheme(theme) {
    return ['light', 'dark'].includes(theme);
  }
}

// Registering the ThemeManagerService
export function initialize(application) {
  application.register('service:theme-manager', ThemeManagerService);
}

// Exporting the initializer
export default {
  name: 'theme-manager',
  initialize: initialize
};
