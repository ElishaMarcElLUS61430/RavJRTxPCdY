// 代码生成时间: 2025-08-15 12:20:42
import Ember from 'ember';
import { later } from '@ember/runloop';

// 创建一个 Ember 组件，用于定时任务调度器
export default Ember.Component.extend({
  // 定时器标识符，用于在组件销毁时清除定时任务
  timerId: null,

  // 定时任务执行的间隔时间，单位为毫秒
  interval: Ember.computed('intervalValue', function() {
    return parseInt(this.get('intervalValue'), 10) || 1000; // 默认为1000毫秒
  }),

  // 执行的定时任务
  task: Ember.computed('taskFunction', function() {
    const taskFunction = this.get('taskFunction');
    return typeof taskFunction === 'function' ? taskFunction : () => { }; // 如果不是函数，则返回空函数
  }),

  // 组件初始化时，设置定时任务
  didInsertElement() {
    this._super(...arguments);
    this.startTask();
  },

  // 组件销毁时，清除定时任务
  willDestroyElement() {
    this._super(...arguments);
    this.clearTask();
  },

  // 开始执行定时任务
  startTask() {
    try {
      const interval = this.get('interval');
      if (!interval) {
        throw new Error('Interval must be set for task to run.');
      }
      const task = this.get('task');
      this.timerId = later(this, task, interval);
    } catch (error) {
      console.error('Failed to start scheduled task:', error);
    }
  },

  // 清除定时任务
  clearTask() {
    if (this.timerId) {
      Ember.run.cancel(this.timerId);
      this.set('timerId', null);
    }
  }
});

// 组件的模板部分（scheduled_tasks_template.hbs）
// {{!-- 这里可以添加定时任务的配置界面 --}}
