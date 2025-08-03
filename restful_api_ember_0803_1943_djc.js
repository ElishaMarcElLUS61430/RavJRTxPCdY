// 代码生成时间: 2025-08-03 19:43:36
 * It demonstrates how to structure a basic Ember application with RESTful API endpoints.
 */

import Ember from 'ember';
import DS from 'ember-data';

// Define the RESTful API adapter to communicate with the server
export default DS.RESTAdapter.extend({
    // Specify the namespace for the API if it's not the root
    namespace: 'api/v1'
});

// Define the model for the API resource
// This example uses a model named 'post'
export default DS.Model.extend({
    // Define the model attributes
    title: DS.attr('string'),
    content: DS.attr('string'),
    createdAt: DS.attr('date'),

    // Define relationships if needed
    // author: DS.belongsTo('user', { async: true }),
    // comments: DS.hasMany('comment', { async: true })
});

// Define the Ember Route for the 'post' resource
// This example shows how to define a route for listing, creating, and showing posts
export default Ember.Route.extend({
    // Inject the service for the data store
    store: Ember.inject.service(),

    model() {
        // Retrieve all posts from the API
        return this.store.findAll('post');
    },

    // Define actions for the route
    actions: {
        createPost() {
            // Handle the action to create a new post
            let newPost = this.store.createRecord('post', {
                title: 'New Post',
                content: 'This is the content of the new post.'
            });

            // Save the new post to the API
            newPost.save()
                .then(() => {
                    // Handle success
                    this.transitionTo('index'); // Redirect to the index route
                })
                .catch(() => {
                    // Handle error
                    Ember.Logger.error('Error creating post');
                });
        }
    }
});

// Define the Ember Controller for the 'post' resource
// This controller handles the logic for the post form and data
export default Ember.Controller.extend({
    // Actions for the controller can be defined here
    actions: {
        savePost() {
            // Handle the action to save a post
            let post = this.get('model');
            post.save()
                .then(() => {
                    // Handle success
                    this.transitionToRoute('post', post.id); // Redirect to the post show route
                })
                .catch(() => {
                    // Handle error
                    Ember.Logger.error('Error saving post');
                });
        }
    }
});
