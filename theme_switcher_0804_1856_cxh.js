// 代码生成时间: 2025-08-04 18:56:12
 * It can be easily integrated into an Ember application and extended for more themes.
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ThemeSwitcherComponent extends Component {
  // Track the current theme
  @tracked currentTheme = 'light';

  // List of available themes
  themes = ['light', 'dark', 'colorful'];

  /**
   * Switches the theme to the specified theme.
   * @param {string} themeName - The name of the theme to switch to.
   */
  @action
  switchTheme(themeName) {
    if (this.themes.includes(themeName)) {
      this.currentTheme = themeName;
      // Apply the theme to the document
      document.documentElement.setAttribute('data-theme', themeName);
    } else {
      // Log an error if the theme is not found
      console.error(`Theme '${themeName}' not found.`);
    }
  }

  // Getter to retrieve the current theme
  get currentThemeClass() {
    return `theme-${this.currentTheme}`;
  }
}
