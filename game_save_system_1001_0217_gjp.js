// 代码生成时间: 2025-10-01 02:17:21
import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { v4 as uuidv4 } from 'uuid';

export default class GameSaveService extends Service {
  @service storage; // Depend on the storage service for local persistence.
  
  // Tracked property to store game state.
  @tracked gameState = {};
  
  /**
   * Save the current game state.
   * @param {object} state - The current game state to save.
   * @returns {string} - The unique ID for the saved game state.
   */
  @action
  saveGameState(state) {
    if (!state) {
      throw new Error('State to save is not provided.');
    }
    const id = uuidv4(); // Generate a unique ID for the save.
    this.storage.setItem(id, state); // Save the state in storage with the generated ID.
    return id;
  }
  
  /**
   * Load a game state by its ID.
   * @param {string} id - The unique ID of the game state to load.
   * @returns {object} - The loaded game state.
   */
  @action
  loadGameState(id) {
    const state = this.storage.getItem(id); // Retrieve the game state from storage.
    if (!state) {
      throw new Error('No game state found with the provided ID.');
    }
    return state;
  }
  
  /**
   * Delete a game state by its ID.
   * @param {string} id - The unique ID of the game state to delete.
   */
  @action
  deleteGameState(id) {
    this.storage.removeItem(id); // Remove the game state from storage.
  }
}
