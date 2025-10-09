// 代码生成时间: 2025-10-09 21:25:45
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

// Define a model for the rehabilitation exercises
class Exercise {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}

// Service to handle exercises data
class ExerciseService {
  constructor() {
    this.exercises = [];
  }

  // Add a new exercise to the collection
  addExercise(newExercise) {
    if (newExercise && newExercise instanceof Exercise) {
      this.exercises.push(newExercise);
    } else {
      throw new Error('Invalid exercise object');
    }
  }

  // Get all exercises
  getAllExercises() {
    return this.exercises;
  }
}

// Controller for the rehabilitation training system
export default class RehabilitationTrainingController extends Controller {
  @service('exercise-service') exerciseService; // Injecting the exercise service
  @tracked exercises = []; // Tracked property for exercises
  @tracked error = null; // Tracked property for error handling

  constructor() {
    super(...arguments);
    this.loadExercises();
  }

  // Action to add a new exercise
  @action
  addExercise(exercise) {
    try {
      this.exerciseService.addExercise(exercise);
      this.loadExercises();
    } catch (error) {
      this.error = error.message;
    }
  }

  // Load exercises from the exercise service
  loadExercises() {
    this.exercises = this.exerciseService.getAllExercises();
  }
}

// Example usage of the Exercise and ExerciseService
// Uncomment and run this in a real Ember.js application environment
// let exerciseService = new ExerciseService();
// let exercise1 = new Exercise(1, 'Stretching', 'Improve flexibility');
// exerciseService.addExercise(exercise1);
