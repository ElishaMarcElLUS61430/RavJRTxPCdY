// 代码生成时间: 2025-08-13 04:10:54
import Ember from 'ember';

// Define a utility service for password encryption and decryption
export default Ember.Service.extend({

  // Encrypts a plaintext password using a simple algorithm
  // @param {string} plaintextPassword - The password to encrypt
  // @returns {string} - The encrypted password
  encryptPassword(plaintextPassword) {
    if (!plaintextPassword) {
      throw new Error('Password cannot be empty');
    }

    // For demonstration purposes, this uses a simple XOR operation.
    // In a real-world application, you would use a more secure method.
    return plaintextPassword.split('').map((char, index) => {
      return String.fromCharCode(char.charCodeAt(0) ^ index);
    }).join('');
  },

  // Decrypts an encrypted password using the same algorithm
  // @param {string} encryptedPassword - The encrypted password to decrypt
  // @returns {string} - The decrypted password
  decryptPassword(encryptedPassword) {
    if (!encryptedPassword) {
      throw new Error('Encrypted password cannot be empty');
    }

    // Using the same XOR operation as the encryption process
    return encryptedPassword.split('').map((char, index) => {
      return String.fromCharCode(char.charCodeAt(0) ^ index);
    }).join('');
  },

  // Validates if the provided password matches the encrypted password
  // @param {string} plaintextPassword - The password to validate
  // @param {string} encryptedPassword - The encrypted password to compare with
  // @returns {boolean} - Whether the password matches the encrypted one
  validatePassword(plaintextPassword, encryptedPassword) {
    const encrypted = this.encryptPassword(plaintextPassword);
    return encrypted === encryptedPassword;
  }

});