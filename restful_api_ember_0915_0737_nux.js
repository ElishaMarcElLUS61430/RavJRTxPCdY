// 代码生成时间: 2025-09-15 07:37:07
import Ember from 'ember';
import ENV from '../config/environment';
import DS from 'ember-data';

// 引入 Ember Data 适配器和序列化器
import { JSONAPIAdapter, JSONAPISerializer } from '@ember-data/adapter/json-api';

// 定义RESTful API的数据适配器
export default class ApplicationAdapter extends JSONAPIAdapter {
  namespace = 'api'; // 设置API命名空间
  host = ENV.apiHost; // 设置API主机地址

  // 重写headers方法以添加自定义HTTP头
  headers = Ember.computed(function() {
    return {
      'API-Key': 'your-api-key', // 假设我们需要一个API密钥
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
  });

  // 错误处理方法
  ajaxError(jqXHR) {
    if (jqXHR && jqXHR.responseJSON && jqXHR.responseJSON.errors) {
      // 这里可以根据错误类型进行不同的处理
      return Promise.reject(jqXHR.responseJSON.errors);
    } else {
      return Promise.reject(jqXHR.responseJSON.message);
    }
  }
}

// 定义RESTful API的数据序列化器
export default class ApplicationSerializer extends JSONAPISerializer {
  // 可以在这里重写序列化方法来自定义数据的序列化
  // 例如，如果某些属性需要特殊处理，可以在这里添加

  // 序列化嵌套关系
  serializeAttribute(snapshot, json, key, attribute) {
    super.serializeAttribute(...arguments);

    // 可以根据需要添加自定义逻辑，例如处理日期格式等
  }
}

// 使用 Ember Data 模型定义资源
export default DS.Model.extend({
  id: DS.attr('string'),
  // 定义其他属性和关系
  // 例如: name: DS.attr('string'),
  // 也可以定义嵌套关系，例如: comments: DS.hasMany('comment', { async: true })

  // 可以在这里添加模型特有的方法
  // 例如: save(), deleteRecord() 等
});