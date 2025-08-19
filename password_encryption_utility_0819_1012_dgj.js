// 代码生成时间: 2025-08-19 10:12:36
import EmberObject from '@ember/object';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import { isEmpty } from '@ember/utils';
import { later } from '@ember/runloop';
import { resolve } from 'rsvp';
import CryptoJS from 'crypto-js';

// Define the service to handle password encryption and decryption
export default EmberObject.extend({
  
  // Encrypts a password using AES algorithm
  encryptPassword: function(password) {
    if (isEmpty(password)) {
      throw new Error('Password cannot be empty');
    }
    const key = CryptoJS.enc.Utf8.parse('Your256BitKey'); // Replace with your own key
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(password, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return {
      ciphertext: encrypted.toString(),
      iv: iv.toString()
    };
  },

  // Decrypts a password using AES algorithm
  decryptPassword: function(ciphertext, iv) {
    if (isEmpty(ciphertext) || isEmpty(iv)) {
      throw new Error('Ciphertext and IV cannot be empty');
    }
    const key = CryptoJS.enc.Utf8.parse('Your256BitKey'); // Replace with your own key
    const decrypted = CryptoJS.AES.decrypt(ciphertext, key, {
      iv: CryptoJS.enc.Utf8.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  // Example usage of the encrypt and decrypt functions
  exampleUsage: function() {
    try {
      const password = 'your-password';
      const { ciphertext, iv } = this.encryptPassword(password);
      console.log('Encrypted:', ciphertext);
      console.log('IV:', iv);
      const decryptedPassword = this.decryptPassword(ciphertext, iv);
      console.log('Decrypted:', decryptedPassword);
    } catch (error) {
      console.error('Error:', error.message);
    }
  }
});