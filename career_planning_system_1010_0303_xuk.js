// 代码生成时间: 2025-10-10 03:03:26
import Ember from 'ember';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class CareerPlanningSystem extends Ember.Component {
  @service store; // Injecting the store service for data persistence
  @tracked careerPlans = []; // Tracked array to hold career plans
  @tracked error = null; // To hold any error messages
  @tracked newPlan = ''; // Holding the new plan to be added
  @tracked selectedPlan = null; // The selected plan for editing

  constructor() {
    super(...arguments);
    this.loadCareerPlans();
  }

  // Load all career plans from the store
  loadCareerPlans() {
    try {
      this.careerPlans = this.store.findAll('career-plan');
    } catch (error) {
      this.error = 'Failed to load career plans.';
      console.error(error);
    }
  }

  // Action to add a new career plan
  @action
  addPlan() {
    if (this.newPlan.trim() === '') {
      this.error = 'Plan cannot be empty.';
      return;
    }
    try {
      const plan = this.store.createRecord('career-plan', {
        title: this.newPlan
      });

      plan.save().then(() => {
        this.careerPlans.pushObject(plan);
        this.newPlan = ''; // Reset new plan input
        this.error = null;
      }).catch((error) => {
        this.error = 'Failed to add new plan.';
        console.error(error);
      });
    } catch (error) {
      this.error = 'Failed to create new plan.';
      console.error(error);
    }
  }

  // Action to select a plan for editing
  @action
  editPlan(plan) {
    this.selectedPlan = plan;
  }

  // Action to update a selected plan
  @action
  updatePlan() {
    if (!this.selectedPlan || this.selectedPlan.title.trim() === '') {
      this.error = 'Plan cannot be empty.';
      return;
    }
    try {
      this.selectedPlan.save().then(() => {
        this.selectedPlan = null; // Reset selected plan
        this.error = null;
      }).catch((error) => {
        this.error = 'Failed to update plan.';
        console.error(error);
      });
    } catch (error) {
      this.error = 'Failed to update plan.';
      console.error(error);
    }
  }

  // Action to delete a selected plan
  @action
  deletePlan(plan) {
    try {
      plan.destroyRecord().then(() => {
        this.careerPlans.removeObject(plan);
        this.error = null;
      }).catch((error) => {
        this.error = 'Failed to delete plan.';
        console.error(error);
      });
    } catch (error) {
      this.error = 'Failed to delete plan.';
      console.error(error);
    }
  }
}
