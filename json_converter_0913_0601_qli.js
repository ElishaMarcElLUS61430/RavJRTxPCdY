// 代码生成时间: 2025-09-13 06:01:44
import Ember from 'ember';

export default Ember.Component.extend({
  // 定义输入JSON数据的属性
  inputJson: null,

  // 定义输出JSON数据的属性
  outputJson: null,

  // 将输入的JSON字符串转换为对象
  convertJson: function() {
    // 检查输入是否为空
    if (!this.get('inputJson')) {
      this.set('outputJson', null);
      alert('输入不能为空');
      return;
    }

    try {
      // 尝试解析JSON字符串
      let json = JSON.parse(this.get('inputJson'));
      // 更新输出JSON数据
      this.set('outputJson', JSON.stringify(json, null, 2));
    } catch (error) {
      // 捕获解析错误并显示错误信息
      this.set('outputJson', null);
      alert('输入的JSON格式不正确');
    }
  }.observes('inputJson'),

  // 清除输出JSON数据
  clearOutput: function() {
    this.set('outputJson', null);
  },

  // 将对象转换为JSON字符串
  formatJson: function() {
    if (!this.get('outputJson')) {
      alert('输出不能为空');
      return;
    }

    try {
      // 尝试将JSON对象转换为字符串
      let formattedJson = JSON.stringify(JSON.parse(this.get('outputJson')), null, 2);
      // 更新输出JSON数据
      this.set('outputJson', formattedJson);
    } catch (error) {
      // 捕获转换错误并显示错误信息
      alert('输出的JSON格式不正确');
    }
  }.observes('outputJson'),

  // 重置输入和输出JSON数据
  reset: function() {
    this.set('inputJson', null);
    this.set('outputJson', null);
  },

  // 定义组件的didReceiveAttrs方法
  didReceiveAttrs() {
    this._super(...arguments);
    // 初始化输入和输出JSON数据
    this.set('inputJson', null);
    this.set('outputJson', null);
  },

  // 定义组件的willDestroy方法
  willDestroy() {
    this._super(...arguments);
    // 清除定时器
    clearInterval(this.get('timer'));
  },

  // 注册定时器，定期检查输入JSON数据的变化
  timer: null,
  init() {
    this._super(...arguments);
    this.set('timer', setInterval(() => {
      this.get('convertJson')();
    }, 1000));
  },
});