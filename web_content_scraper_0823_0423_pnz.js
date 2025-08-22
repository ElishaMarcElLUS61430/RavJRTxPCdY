// 代码生成时间: 2025-08-23 04:23:44
import Ember from 'ember';
import fetch from 'fetch'; // 使用fetch API进行网络请求
import { htmlSafe } from '@ember/string'; // 用于返回安全的HTML字符串

const { Route } = Ember;

export default class WebContentScraperRoute extends Route {
  // 路由的model方法，用于获取数据
  model() {
    return this.fetchContent(this.get('url'));
  }

  // 异步函数，用于获取网页内容
  async fetchContent(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      // 将文本内容安全地转换为HTML格式
      return htmlSafe(text);
    } catch (error) {
      // 错误处理
      console.error('Error fetching content:', error);
      return '';
    }
  }
}

// 文档注释
/**
 * WebContentScraperRoute
 * Route handler for a web content scraping tool.
 * It fetches content from a given URL and returns it as HTML-safe string.
 *
 * @param {string} url - The URL from which to scrape content.
 * @return {string} - The scraped content as an HTML-safe string.
 * @throws {Error} - If there is an error fetching the content.
 */