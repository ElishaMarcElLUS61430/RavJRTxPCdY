// 代码生成时间: 2025-10-14 00:00:30
import Ember from 'ember';
import { later } from '@ember/runloop';
import { computed } from '@ember/object';
import { isBlank } from '@ember/utils';
import { A } from '@ember/array';
import ML from 'machine-learning-library'; // 假设有一个机器学习库ML

// 机器学习模型训练器组件
export default Ember.Component.extend({
  // 模型数据
  modelData: A([]),

  // 模型训练状态
  isTraining: false,

  // 模型训练错误信息
  trainingError: null,

  // 模型训练完成回调
  didTrainModel: null,

  // 模型训练数据
  get modelTrainingData() {
    return this.get('modelData').slice(); // 返回模型数据的副本
  },

  // 训练模型
  trainModel: Ember.observer('modelTrainingData', function() {
    if (this.get('isTraining')) {
      return; // 如果已经在训练，则不重复训练
    }

    this.set('isTraining', true);
    this.set('trainingError', null);

    const data = this.get('modelTrainingData');
    ML.trainModel(data)
      .then(model => {
        this.set('isTraining', false);
        this.set('didTrainModel', model); // 设置训练完成的模型
      }).catch(error => {
        this.set('isTraining', false);
        this.set('trainingError', error.message); // 设置训练错误信息
      }).finally(() => {
        later(() => this.sendAction('didTrainModel', this.get('didTrainModel')), 500); // 延迟发送训练完成动作
      });
  }),

  // 清除模型训练数据
  clearModelData() {
    this.set('modelData', A([]));
  },

  // 添加模型训练数据
  addModelData: Ember.on('input', function() {
    const input = this.element.querySelector('input').value;
    if (isBlank(input)) {
      return; // 如果输入为空，则不添加数据
    }

    this.get('modelData').pushObject(input);
  }),

  // 组件初始化时添加初始数据
  didInsertElement() {
    this._super(...arguments);
    this.get('modelData').pushObject('Initial Data 1');
    this.get('modelData').pushObject('Initial Data 2');
  },

  // 组件销毁时清除数据
  willDestroyElement() {
    this._super(...arguments);
    this.clearModelData();
  },

  // 动作发送
  actions: {
    // 清除模型训练数据
    clearModelData() {
      this.clearModelData();
    },

    // 添加模型训练数据
    addModelData() {
      this.addModelData();
    },

    // 训练模型
    trainModel() {
      this.trainModel();
    },
  }
});