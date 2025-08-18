// 代码生成时间: 2025-08-19 04:59:59
import Ember from 'ember';
import DS from 'ember-data';

// Define a model for our data
const { Model, attr, hasMany, belongsTo } = DS;

export default class PostModel extends Model {
  // Define attributes
  @attr('string') title;
  @attr('string') content;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  // Define relationships
  @hasMany('comment', { async: false }) comments;
  @belongsTo('user', { async: false }) author;

  // Example of a computed property
  @computed('title', 'content')
  get summary() {
    return this.title + '

' + this.content.substring(0, 100);
  }
}

// Define a model for comments
export class CommentModel extends Model {
  @attr('string') text;
  @belongsTo('post', { async: false }) post;
  @belongsTo('user', { async: false }) author;
}

// Define a model for users
export class UserModel extends Model {
  @attr('string') username;
  @hasMany('post', { async: false }) posts;
  @hasMany('comment', { async: false }) comments;
}
