// 代码生成时间: 2025-09-29 00:01:06
import Ember from 'ember';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class DigitalBankingPlatform extends Ember.Component {
  @tracked accountName = '';
  @tracked accountBalance = 0;
  @tracked depositAmount = '';
  @tracked withdrawalAmount = '';
  @tracked errorMessage = '';

  // Creates a new bank account with the given name
  @action
  createAccount() {
    try {
      if (this.accountName.trim() === '') {
        throw new Error('Account name cannot be empty.');
      }
      // Here you would typically integrate with a back-end service to create an account
      // For this example, we're just simulating account creation
      this.accountBalance = 0; // New account starts with a balance of 0
      this.accountName = ''; // Reset the account name input
      this.errorMessage = ''; // Clear any error messages
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Deposits the specified amount into the current account
  @action
  deposit() {
    try {
      if (this.depositAmount.trim() === '' || isNaN(this.depositAmount)) {
        throw new Error('Please enter a valid deposit amount.');
      }
      const amount = parseFloat(this.depositAmount);
      if (amount <= 0) {
        throw new Error('Deposit amount must be greater than zero.');
      }
      this.accountBalance += amount;
      this.depositAmount = ''; // Reset the deposit input
      this.errorMessage = ''; // Clear any error messages
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Withdraws the specified amount from the current account
  @action
  withdraw() {
    try {
      if (this.withdrawalAmount.trim() === '' || isNaN(this.withdrawalAmount)) {
        throw new Error('Please enter a valid withdrawal amount.');
      }
      const amount = parseFloat(this.withdrawalAmount);
      if (amount <= 0) {
        throw new Error('Withdrawal amount must be greater than zero.');
      }
      if (amount > this.accountBalance) {
        throw new Error('Insufficient funds for withdrawal.');
      }
      this.accountBalance -= amount;
      this.withdrawalAmount = ''; // Reset the withdrawal input
      this.errorMessage = ''; // Clear any error messages
    } catch (error) {
      this.errorMessage = error.message;
    }
  }

  // Returns the current state of the account for display
  get accountInfo() {
    return `Account: ${this.accountName}, Balance: $${this.accountBalance.toFixed(2)}`;
  }
}
