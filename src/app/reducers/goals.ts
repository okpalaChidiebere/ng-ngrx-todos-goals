import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import { addGoal, removeGoal, Goal } from '../actions/goals';
import { receiveData } from '../actions/shared';

export const GOALS_FEATURE_KEY = 'goals';
export const getGoalsState = createFeatureSelector(GOALS_FEATURE_KEY);
export type GoalsState = Goal[];
export const initialState: GoalsState = [];

export const goalsReducer = createReducer(
  initialState,
  on(addGoal, (state, action) => state.concat([action.goal])),
  on(removeGoal, (state, props) =>
    state.filter((goal) => goal.id !== props.id)
  ),
  on(receiveData, (state, action) => action.goals)
);

export const selectGoals = createSelector(
  getGoalsState,
  (state: GoalsState) => state
);
