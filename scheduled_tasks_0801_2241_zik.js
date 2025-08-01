// 代码生成时间: 2025-08-01 22:41:03
import EmberObject from '@ember/object';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import Service from '@ember/service';

// 定义一个用于存储任务的类
const Task = EmberObject.extend({
  callback: null,
  interval: null,
  lastRun: null,
  nextRun: null,

  // 计算属性用于确定任务是否应该运行
  shouldRun: computed('interval', 'lastRun', function() {
    const now = new Date().getTime();
    return this.get('interval') && now >= this.get('nextRun');
  }),

  // 执行任务的函数
  run() {
    if (this.get('shouldRun')) {
      this.get('callback')();
      this.set('lastRun', new Date().getTime());
      this.set('nextRun', this.get('lastRun') + this.get('interval'));
    }
  }
});

// 定时任务调度器服务
export default Service.extend({
  // 存储所有任务的数组
  tasks: A(),

  // 添加任务到调度器
  addTask(callback, interval) {
    if (!interval) {
      throw new Error('Interval must be provided for task');
    }
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    const task = Task.create({
      callback: callback,
      interval: interval,
      lastRun: new Date().getTime(),
      nextRun: new Date().getTime() + interval
    });
    this.get('tasks').pushObject(task);
  },

  // 移除任务从调度器
  removeTask(task) {
    this.get('tasks').removeObject(task);
  },

  // 启动调度器，每100毫秒检查一次任务是否应该运行
  start() {
    later(() => {
      if (this.isDestroyed || this.isDestroying) {
        return;
      }
      this.get('tasks').forEach(task => task.run());
      this.start();
    }, this, 100);
  },

  // 停止调度器
  stop() {
    // 由于later创建的是不可取消的定时器，我们无法停止它，但可以标记调度器为销毁状态
    // 使其不再执行任务。
    this.set('isDestroying', true);
  },

  // 在服务销毁时停止调度器
  willDestroy() {
    this.stop();
  }
});