import { createAction, props } from '@ngrx/store';

export type Goal = {
  id: string;
  name: string;
};

export const addGoal = createAction('[Goal] Add', (goal: Goal) => ({
  goal,
}));

export const removeGoal = createAction(
  '[Goal] Remove',
  props<Pick<Goal, 'id'>>()
);
