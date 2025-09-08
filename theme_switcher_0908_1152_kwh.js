// 代码生成时间: 2025-09-08 11:52:57
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// ThemeSwitcher component, responsible for switching themes
export default class ThemeSwitcherComponent extends Component {
  // Tracked property to store the current theme
  @tracked currentTheme = 'light'; // default theme

  // List of available themes
  themes = ['light', 'dark', 'colorful'];

  // Action to switch themes
  @action
  switchTheme(theme) {
    // Validate if the theme is in the list of available themes
    if (!this.themes.includes(theme)) {
      console.error(`Error: '${theme}' is not a valid theme.`);
      return;
    }

    // Update the current theme
    this.currentTheme = theme;

    // Apply the theme to the document
    document.documentElement.className = theme;
  }
}
