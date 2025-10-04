// 代码生成时间: 2025-10-05 00:00:25
import EmberObject from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// BlockchainNodeManager is a class that manages blockchain nodes.
// It allows for adding, removing, and listing nodes.
export default class BlockchainNodeManager extends EmberObject {
  @tracked nodes = [];

  constructor() {
    super(...arguments);
    // Initialize the nodes array
    this.nodes = [];
  }

  // Adds a new node to the blockchain network.
  @action
  async addNode(nodeData) {
    try {
      // Validate node data before adding
      if (!nodeData || typeof nodeData !== 'object') {
        throw new Error('Invalid node data provided.');
      }

      // Add the node to the array
      this.nodes.push(nodeData);
      console.log(`Node added: ${JSON.stringify(nodeData)}`);
    } catch (error) {
      console.error(`Failed to add node: ${error.message}`);
      throw error; // Re-throw to allow for error handling upstream
    }
  }

  // Removes a node from the blockchain network.
  @action
  async removeNode(nodeId) {
    try {
      // Find the node to remove and remove it from the array
      const index = this.nodes.findIndex(node => node.id === nodeId);
      if (index === -1) {
        throw new Error('Node not found.');
      }

      this.nodes.splice(index, 1);
      console.log(`Node removed: ${nodeId}`);
    } catch (error) {
      console.error(`Failed to remove node: ${error.message}`);
      throw error; // Re-throw to allow for error handling upstream
    }
  }

  // Lists all nodes in the blockchain network.
  @action
  async listNodes() {
    console.log('Listing all nodes:', this.nodes);
    return this.nodes;
  }
}
