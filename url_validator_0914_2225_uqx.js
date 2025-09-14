// 代码生成时间: 2025-09-14 22:25:38
import Ember from 'ember';

// 使用 Ember 的 Service 来创建一个 URL 验证器
export default Ember.Service.extend({

  // 验证 URL 是否有效
  validateUrl(url) {
    // 使用 try...catch 结构来处理潜在的错误
    try {
      // 使用 URL 构造函数来解析 URL，该构造函数会自动验证 URL 格式
      const parsedUrl = new URL(url);
      // 如果 URL 可以被解析，则认为它是有效的
      return true;
    } catch (error) {
      // 如果解析 URL 时抛出错误，则认为 URL 是无效的
      return false;
    }
  },

  // 获取 URL 的协议（例如：http: 或 https:）
  getUrlProtocol(url) {
    try {
      // 解析 URL
      const parsedUrl = new URL(url);
      // 返回 URL 的协议部分
      return parsedUrl.protocol;
    } catch (error) {
      // 如果解析失败，返回 null 并处理错误
      console.error('Invalid URL:', error.message);
      return null;
    }
  },

  // 获取 URL 的主机名（例如：www.example.com）
  getUrlHostname(url) {
    try {
      // 解析 URL
      const parsedUrl = new URL(url);
      // 返回 URL 的主机名部分
      return parsedUrl.hostname;
    } catch (error) {
      // 如果解析失败，返回 null 并处理错误
      console.error('Invalid URL:', error.message);
      return null;
    }
  },

  // 获取 URL 的路径（例如：/path/to/resource）
  getUrlPath(url) {
    try {
      // 解析 URL
      const parsedUrl = new URL(url);
      // 返回 URL 的路径部分
      return parsedUrl.pathname;
    } catch (error) {
      // 如果解析失败，返回 null 并处理错误
      console.error('Invalid URL:', error.message);
      return null;
    }
  }

});