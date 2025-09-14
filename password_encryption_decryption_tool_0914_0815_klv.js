// 代码生成时间: 2025-09-14 08:15:07
import Ember from 'ember';

// 定义PasswordTool类，用于密码的加密和解密
export default Ember.Object.extend({
    // 使用Ember的computed property来动态加密和解密密码
    encryptedPassword: Ember.computed('password', function() {
        const password = this.get('password');
        if (!password) {
            return '';
        }
        // 使用简单的异或加密作为示例
        const encrypted = password.split('').map((char, index) => {
            return String.fromCharCode(char.charCodeAt(0) ^ index);
        }).join('');
        this.set('encrypted', encrypted);
        return encrypted;
    }),

    // 解密功能，通过异或进行解密
    decryptedPassword: Ember.computed('encrypted', function() {
        const encrypted = this.get('encrypted');
        if (!encrypted) {
            return '';
        }
        // 使用相同的异或算法进行解密
        const decrypted = encrypted.split('').map((char, index) => {
            return String.fromCharCode(char.charCodeAt(0) ^ index);
        }).join('');
        this.set('password', decrypted);
        return decrypted;
    }),

    // 设置密码的函数
    setPassword(password) {
        this.set('password', password);
    },

    // 获取加密后的密码
    getEncryptedPassword() {
        return this.get('encryptedPassword');
    },

    // 获取解密后的密码
    getDecryptedPassword() {
        return this.get('decryptedPassword');
    },

    // 重置密码工具
    reset() {
        this.set('password', null);
        this.set('encrypted', null);
    }
});
