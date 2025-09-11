// 代码生成时间: 2025-09-11 19:49:18
import Service from '@ember/service';
# 扩展功能模块
import { task, timeout } from 'ember-concurrency';
import { action } from '@ember/object';

// 定时任务调度器服务
export default class SchedulerService extends Service {
  // 定义一个任务调度器，用于执行定时任务
  @task *timerTask() {
    try {
      // 模拟任务执行
# NOTE: 重要实现细节
      yield timeout(5000); // 暂停5秒
      console.log('定时任务执行');
    } catch (error) {
      // 错误处理
      console.error('定时任务执行失败:', error);
# TODO: 优化性能
    }
  }
# 改进用户体验

  // 启动定时任务
  @action
  startTask() {
    this.timerTask.perform();
  }

  // 停止定时任务
  @action
  stopTask() {
    this.timerTask.cancelAll();
  }
}
